const jwt = require('jsonwebtoken')
// const roles = [ 'normal', 'admin' ]
function regValid(req, res, next) {
	if (req.body && req.body.username && req.body.password) {
		next()
	} else {
		res.status(400).json({ message: 'Username or Password not entered' })
	}
}
function restrict() {
	return async (req, res, next) => {
		const errMessage = (err) => {
			res.status(err).json({
				message: 'Invalid Credentials'
			})
		}
		try {
			const token = req.headers.authorization || req.cookies.token
			console.log(req.cookies.token)
			if (!token) {
				// return errMessage(401)
				return res.status(401).json({ message: 'Invalid 1' })
			}
			jwt.verify(token, process.env.JWT_SECRET || 'Seven Deadly Sins', (err, decoded) => {
				if (err) {
					return errMessage(401)
				}
				// if (role && roles.indexOf(decoded.userRole) < roles.indexOf(role)) {
				// 	return errMessage(400)
				// }
				next()
			})
		} catch (err) {
			next(err)
		}
	}
}
module.exports = { regValid, restrict }