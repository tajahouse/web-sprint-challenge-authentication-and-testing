const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../users/usersModel");
const amw = require("./authenticate-middleware");

router.get("/users", amw.restrict("normal"), async (req, res, next) => {
  try {
    res.json(await auth.find());
  } catch (err) {
    next(err);
  }
});

router.post("/register", amw.regValid, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await auth.findBy({ username }).first();
    if (user) {
      res.status(409).json({
        message: "Username already taken",
      });
    }

    const newUser = await auth.add({
      username,
      password: await bcrypt.hash(password, 12),
    });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await auth.findBy({ username }).first();

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const payload = {
      userId: user.id,
      username: user.username,
      role: "user",
    };

    res.cookie(
      "token",
      jwt.sign(payload, process.env.JWT_SECRET || "Seven Deadly Sins")
    );
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "Seven Deadly Sins"
    );
    res.json({
      message: `Welcome ${user.username}!`,
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/logout", async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.status(204).end();
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
