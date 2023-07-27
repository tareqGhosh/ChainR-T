const Models = require("./../models");
const Blog = Models.Blog;
const yup = require("yup");

exports.index = async (req, res) => {
  const page = typeof req.query.page !== "undefined" ? req.query.page : 1;
  const page_size =
    typeof req.query.page_size !== "undefined" ? req.query.page_size : 10;
  const offset = (page - 1) * page_size;
  const limit = parseInt(page_size);
  var blogs = await Blog.findAll({
    limit: limit,
    offset: offset,
    where: { user_id: req.user_id },
  });

  return res.json({ blogs });
};

validatePost = async (req, res) => {
  let schema = yup.object().shape({
    title: yup.string().required("title is required"),
    description: yup.string().required("description is required."),
  });
  let valid = await schema
    .validate(
      {
        title: req.body.title,
        description: req.body.description,
      },
      { abortEarly: false }
    )
    .then(function (valid) {
      return valid;
    })
    .catch((err) => {
      return err;
    });
  if (valid.errors) {
    return res.status(422).json({ msg: valid.inner });
  }
};

exports.update = async (req, res) => {
  const id = typeof req.params.id !== "undefined" ? req.params.id : null;
  if (!id) {
    return res.status(422).json({ msg: "No blog id found!" });
  }
  validatePost(req, res);
  try {
    var blog = {
      title: req.body.title,
      description: req.body.description,
    };
    updated_blog = await Blog.update(blog, {
      where: { user_id: req.user_id, id: id },
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later." });
  }
  if (updated_blog[0] == 0) {
    return res.status(404).json({ msg: "blot not found" });
  }
  res.status(201).json({ blog: updated_blog });
};

exports.post = async (req, res) => {
  validatePost(req, res);
  try {
    var blog = {
      title: req.body.title,
      description: req.body.description,
      user_id: req.user_id,
    };
    created_blog = await Blog.create(blog);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later." });
  }

  res.status(201).json({ blog: created_blog });
};

exports.fetch = async (req, res) => {
  const id = typeof req.params.id !== "undefined" ? req.params.id : null;
  if (!id) {
    return res.status(422).json({ msg: "No blog id found!" });
  }
  const found = await Blog.findOne({ where: { user_id: req.user_id, id: id }, include: 'user' });
  if (!found) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  found.user_id = found.user.first_name + " " + found.user.last_name
  return res.status(200).json({ msg: found });
};

exports.delete = async (req, res) => {
  const id = typeof req.params.id !== "undefined" ? req.params.id : null;
  if (!id) {
    return res.status(422).json({ msg: "No blog id found!" });
  }
  const deleted = await Blog.destroy({
    where: { user_id: req.user_id, id: id },
  });
  if (!deleted) {
    return res.status(404).json({ msg: "Blog not found" });
  }
  return res.status(200).json({ msg: "Blog deleted" });
};
