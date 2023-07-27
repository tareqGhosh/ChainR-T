var express = require("express");
var router = express.Router();
const BlogsController = require("../controllers/BlogsController");

function logMethod (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  }
  
router.get("/", BlogsController.Index);

router.post("/post", BlogsController.createBlog);

module.exports = router;
