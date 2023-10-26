const express = require("express");
const JwtAuth = require("../middlewares/JwtAuth");
const router = express.Router();
const jsonBodyParser = require("body-parser").json();
const ProjectController = require("../controllers/ProjectController");

router.post(
    "/projects/create",
    JwtAuth.verifyToken,
    jsonBodyParser,
    ProjectController.createProject
);
router.post(
    "/skills/create",
    JwtAuth.verifyToken,
    jsonBodyParser,
    ProjectController.createSkill
);
router.post(
    "/projects/add-skill",
    JwtAuth.verifyToken,
    jsonBodyParser,
    ProjectController.addSkillToProject
);
router.get("/skills", ProjectController.getSkills);
router.use("/projects/:email", jsonBodyParser, ProjectController.getProjects);

module.exports = router;
