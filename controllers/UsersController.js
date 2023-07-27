const Models = require("./../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = Models.User;
const yup = require("yup");

exports.signup = async (req, res) => {
  let schema = yup.object().shape({
    first_name: yup.string().required("first name is required!"),
    last_name: yup.string().required("last name is required."),
    email: yup.string().required().email("email is required!"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  let valid = await schema
    .validate(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
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
  let check = await User.findOne({ where: { email: req.body.email } });
  if (check) {
    return res.status(422).json({ msg: "Email is already taken!" });
  }
  const salt = await bcrypt.genSalt(10);
  var usr = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
  };
  created_user = await User.create(usr);
  token = jwt.sign(
    {
      id: created_user.id,
      email: created_user.email,
      created_user: created_user.first_name,
    },
    process.env.SECRET
  );
  res.status(201).json({ user: created_user, token: token });
};

exports.login = async (req, res) => {
  let schema = yup.object().shape({
    email: yup.string().required().email("email is required!"),
    password: yup.string().required("No password provided."),
  });
  let valid = await schema
    .validate(
      {
        email: req.body.email,
        password: req.body.password,
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
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const password_valid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (password_valid) {
      token = jwt.sign(
        { id: user.id, email: user.email, first_name: user.first_name },
        process.env.SECRET
      );
      res.status(200).json({ token: token });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
};
