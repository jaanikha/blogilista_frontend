const User = require('../models/user')
const jwt = require('jsonwebtoken')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
  
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      req.token = authorization.substring(7)
    }
    next()
}

const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    req.user = user

    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}