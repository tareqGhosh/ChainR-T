var express = require("express");
var router = express.Router();
const BlogsController = require("../controllers/BlogsController");
const middleware = require("../middleware/auth")
  
router.get("/",middleware.myRequestHeaders, middleware.validateRequest, BlogsController.index);
router.get("/show/:id",middleware.myRequestHeaders, middleware.validateRequest, BlogsController.fetch);

router.post("/",middleware.myRequestHeaders, middleware.validateRequest, BlogsController.post);

router.put("/:id",middleware.myRequestHeaders, middleware.validateRequest, BlogsController.update);

router.delete("/:id",middleware.myRequestHeaders, middleware.validateRequest, BlogsController.delete);

module.exports = router;
