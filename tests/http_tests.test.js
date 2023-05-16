const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

  const blog = new Blog({ title: 'root', author:'ana' , url: 'mana' , likes: 0})
  //await user.save()
  await api.post('/api/users').send(user)
  await blog.save()
})

describe('unique users and blogs operation', () => {
  test('add new blog with correct user', async () => {
    
    // const responseBlogs = await api.get('/api/blogs')
    const loginData = {
      username: 'root',
      password: 'sekret'
    }
    //console.log(JSON.stringify(loginData))
    const user = await api
      .post('/api/login')
      .send(loginData)
      .expect(200)

    console.log('user, ', user.body)

    const token = user.body.token
    //console.log(JSON.stringify(token))
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if (!token || !decodedToken.id) {
      // return response.status(401).json({ error: 'token missing or invalid' })
      console.log('token missing or invalid')
    }

    const userId = decodedToken.id
    //console.log('userId', userId)

    const newBlog = {
      "title": "Data Science",
      "author": "Ana",
      "url": "limo",
      "likes": 311
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(200)
      //.expect(400)

      //console.log(newBlog)
  }, 20000)

  test('add new blog with no token', async () => {
    // const responseBlogs = await api.get('/api/blogs')

    const loginData = {
      username: 'root',
      password: 'sekret'
    }
    console.log(JSON.stringify(loginData))
    const user = await api
      .post('/api/login')
      .send(loginData)
      .expect(200)

    console.log('user, ', user.body)

    const token = user.body.token
    console.log(JSON.stringify(token))
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if (!token || !decodedToken.id) {
      // return response.status(401).json({ error: 'token missing or invalid' })
      console.log('token missing or invalid')
    }

    const userId = decodedToken.id
    console.log('userId', userId)

    const newBlog = {
      "title": "Data Science",
      "author": "Ana",
      "url": "limo",
      "likes": 311
    }

    await api
      .post('/api/blogs')
      //.set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(400)
      //.expect(400)
  }, 25000)

})

afterAll(() => {
  mongoose.connection.close()
})