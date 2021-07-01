const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper.js')
const app = require('../app')


const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('status code 400 when title is not given', async () => {
    const newBlog = {
        author: 'uusiblogaaja',
        url: 'qwertyqwertyqwerty',
        likes: 2
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('status code 400 when url is not given', async () => {
    const newBlog = {
        title: 'uusiblogi',
        author: 'uusiblogaaja',
        likes: 2
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('likes is set to 0 when no value given', async () => {
    const newBlog = {
        title: 'uusiblogi',
        author: 'uusiblogaaja',
        url: 'qwertyqwertyqwerty'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const uusiblogi = response.body.filter(blog => blog.title ==='uusiblogi')
    expect(uusiblogi[0].likes).toBe(0)
})

test('blog can be added and the title is correct', async () => {
    const newBlog = {
        title: 'uusiblogi',
        author: 'uusiblogaaja',
        url: 'qwertyqwertyqwerty',
        likes: 4
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('uusiblogi')
})


test('blog contains an id-field called "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})
  
test('there are the right amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})