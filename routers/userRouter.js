const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser").json();
const JwtAuth = require("../middlewares/JwtAuth");

const UserController = require("../controllers/UserController");
const ProjectController = require("../controllers/ProjectController");

router.post(
    "/add-dir",
    bodyParser,
    JwtAuth.verifyToken,
    UserController.addDirectoryForUser
);
router.post(
    "/add-dir/:email",
    bodyParser,
    JwtAuth.verifyToken,
    UserController.addDirectoryForUser
);
router.get("/dirs/:email", bodyParser, UserController.getUserMeta);
router.get(
    "/dirs",
    bodyParser,
    JwtAuth.verifyToken,
    UserController.getUserMeta
);

router.post(
    "/add-project",
    bodyParser,
    JwtAuth.verifyToken,
    ProjectController.addProjectToUser
);
router.post(
    "/add-project/:email",
    bodyParser,
    JwtAuth.verifyToken,
    ProjectController.addProjectToUser
);
module.exports = router;
