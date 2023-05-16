const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => 
{  const authorization = request.get('authorization')  
if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')  
    }
    if (authorization && authorization.startsWith('bearer ')) {
      return authorization.replace('bearer ', '')  
    }    
    return null
  }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  .find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    console.log(body)

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)  

    //console.log(decodedToken)
    if (!decodedToken.id) {    
      return response.status(401).json({ error: 'token invalid' })  
    }

    const user = await User.findById(decodedToken.id)

  const blog = new Blog({ 
    title: body.title, 
    author: body.author, 
    url: body.url,
    likes: body.likes,
    user: user.id })
    const savedBlog = await blog.save()
    
      user.blogs = user.blogs.concat(savedBlog.id)
      await user.save()
      response.json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  console.log(JSON.stringify(token))
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const userBlogs = user.blogs
  
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else {
    return response.status(401).json({ error: 'invalid user' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log(JSON.stringify(body))

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())

})

module.exports = blogsRouter
