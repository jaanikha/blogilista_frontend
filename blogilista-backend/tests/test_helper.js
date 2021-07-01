const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'testi1',
    author: 'testaaja1',
    url: 'asdasd123123',
    likes: '1'
  },
  {
    title: 'testi2',
    author: 'testaaja2',
    url: 'qwerty101010',
    likes: '2'
  },
]

const initialUsers = [
  {
    username: 'Masa',
    name: 'Matti',
    password: '1234567'
  }
]

module.exports = {
    initialBlogs, initialUsers
}