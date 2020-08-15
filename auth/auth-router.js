const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const auth = require('./auth-model')
const restrict = require('./authenticate-middleware');

router.get("/users", restrict(), async (req, res, next) =>{
      try{
          res.json(await auth.find())
        } catch(err) {
            next(err)
      }
})

router.post('/register', async (req, res, next) => {
  try{
    const { username, password } = req.body
    const user = await auth.findBy({ username }).first()
      if(user){
        res.status(409).json({
          message: 'Username already taken'
        })
      }

      const newUser = await auth.add({
        username,
        password: await bcrypt.hash(password, 12)
      })
        res.status(201).json(newUser)
  } catch (err) {
      next(err)
  }

});

router.post('/login', async (req, res, next) => {
  try {
		const { username, password } = req.body
		const user = await auth.findBy({ username }).first()
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}
		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}
     
        const payload = {
                userId: user.id,
                uername: user.username,
        }

		res.json({
            message: `Welcome ${user.username}!`,
            token: jwt.sign(payload, "all mine, not yours"),
		})
	} catch(err) {
		next(err)
	}
});

router.get("/logout", async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err) {
				next(err)
			} else {
				res.status(204).end()
			}
		})
	} catch (err) {
		next(err)
	}
})

module.exports = router;
