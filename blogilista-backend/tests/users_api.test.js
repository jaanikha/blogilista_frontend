const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper.js')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe ('invalid users can not be added', () => {

    test('status code 400 when username is too short', async () => {
        const newUser = {
            username: 'M',
            name: 'Matti',
            password: '123456'
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(helper.initialUsers.length)
    })

    test('status code 400 when username is not unique', async () => {
        const newUser = {
            username: 'Masa',
            name: 'Matti',
            password: '123456'
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(helper.initialUsers.length)
    })

    test('status code 400 when password is too short', async () => {
        const newUser = {
            username: 'UniikkiMasa',
            name: 'Matti',
            password: '12'
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(helper.initialUsers.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})