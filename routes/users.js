var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
const UsersController = require("../controllers/UsersController");
dotenv.config();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", UsersController.signup);

router.post("/login", UsersController.login);

module.exports = router;
