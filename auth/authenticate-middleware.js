const jwt  = require("jsonwebtoken");

function restrict() {
  return async (req, res, next) => {
    const errMessage = (err, messageStatement) => {
      res.status(err).json({
        message: messageStatement,
      });
    };
    try {
       const token = req.headers.authorization;
      if (!token) {
        return errMessage(401, "Invalid Credentials");
      }

      jwt.verify(token, "all mine, not yours", (err, decoded) => {
        if (err) {
          return errMessage(401, "Invalid Credentials");
        }
        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;

module.exports = (req, res, next) => {
  res.status(401).json({ you: 'shall not pass!' });
};
