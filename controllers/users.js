const bcrypt = require('bcrypt')
const {body, validationResult} = require('express-validator')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', 
body('password').isLength({ min: 3 }),
async (request, response) => {
  const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: "password is too short, minimum required: 3 characters long"});
    }
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash,
  })
  //console.log(user.username)

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  .find({}).populate('blogs', {title: 1, url: 1, likes: 1, author: 1})
  response.json(users)
})

module.exports = usersRouter