const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  .populate('user', { username: 1, name: 1 })

  res.json(blogs.map(blog => blog.toJSON()))
})
  

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  
  const user = req.user

  if (body.title === undefined) {
    return res.status(400).json({ error: 'title missing' })
  }
  if (body.url === undefined) {
    return res.status(400).json({ error: 'url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.json(savedBlog.toJSON())
})


blogsRouter.delete('/:id', async (req, res) => {
  
  const blog = await Blog.findById(req.params.id)
  const userid = (req.user)._id
  
  if (!(blog.user.toString() === userid.toString())) {
    return res.status(401).json({ error: 'no authorization to delete this item' })
  }
  
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog.toJSON)
})

module.exports = blogsRouter