const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const authenticate = require('../auth/authenticate-middleware.js')
const authRouter = require('../auth/auth-router.js')
const jokesRouter = require('../jokes/jokes-router.js')
const cookieParser = require('cookie-parser')
const server = express()
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())
server.use('/api/auth', authRouter)
server.use('/api/jokes', authenticate.restrict('normal'), jokesRouter)
server.use('/', (req, res) => {
	res.json({
		message: `🐶 You're barking up the right 🌴`
	})
})
module.exports = server