const express = require("express");
const router = express.Router();
const JwtAuth = require("../middlewares/JwtAuth");
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");

const bodyParser = require("body-parser");
const jsonBodyParser = bodyParser.json();

router.post("/login", jsonBodyParser, AuthController.login);
router.post("/signup", jsonBodyParser, AuthController.signup);
router.get(
    "/users",
    jsonBodyParser,
    JwtAuth.verifyToken,
    UserController.getAllUsers
);

module.exports = router;
