const jwt = require("jsonwebtoken");

const { header, validationResult } = require("express-validator");

verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.user_id = decoded.id;
  });
};

const myRequestHeaders = [
  header("authorization")
    .exists({ checkFalsy: true })
    .withMessage("Missing Authorization Header")
    .bail()
    .contains("Bearer")
    .withMessage("Authorization Token is not Bearer"),
];

validateRequest = async (req, res, next) => {
  const validationErrors = validationResult(req);
  const errorMessages = [];

  for (const e of validationErrors.array()) {
    errorMessages.push(e.msg);
  }

  if (!validationErrors.isEmpty()) {
    return res.status(403).json({ errors: errorMessages });
  }
  verifyToken(req, res);
  next();
};
module.exports = {
  myRequestHeaders: myRequestHeaders,
  validateRequest: validateRequest,
};
