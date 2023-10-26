const Project = require("../model/Project");
const Skill = require("../model/Skill");
const User = require("../model/User");

const createProject = async (req, res, next) => {
    const { title, thumbnail, description, href } = req?.body;
    let newProject;
    try {
        newProject = await Project.create({
            title,
            thumbnail,
            description,
            href,
        });
    } catch (err) {
        return res.status(500).json({ message: "Unable to create project" });
    }
    if (!newProject)
        return res.status(500).json({ message: "Unable to create project" });
    return res
        .status(200)
        .json({ message: "Project created successfully", data: newProject });
};

const addProjectToUser = async (req, res, next) => {
    const userEmail = req?.params?.email
        ? req?.params?.email
        : req?.user?.email;
    const { projectId } = req.body;
    let authUser;
    let locatedProject;
    try {
        authUser = await User.findOne({ email: userEmail });
        locatedProject = await Project.findById(projectId);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
    if (!locatedProject || !authUser)
        return res
            .status(404)
            .json({ message: "Either User or Project not found" });
    let updatedUser;
    try {
        authUser.projects.push(locatedProject);
        updatedUser = await authUser.save();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
    return res.status(200).json({
        message: "Project added to user successfully",
        data: updatedUser,
    });
};

const createSkill = async (req, res, next) => {
    const { title, icon } = req?.body;
    let newSkill;
    try {
        newSkill = await Skill.create({ title, icon });
    } catch (err) {
        return res.status(500).json({ message: "Unable to create skill" });
    }
    if (!newSkill)
        return res.status(500).json({ message: "Unable to create skill" });
    return res
        .status(200)
        .json({ message: "Skill created successfully", data: newSkill });
};

const addSkillToProject = async (req, res, next) => {
    const { projectId, skillId } = req.body;
    let locatedProject;
    let locatedSkill;
    try {
        locatedProject = await Project.findById(projectId);
        locatedSkill = await Skill.findById(skillId);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    if (!locatedProject || !locatedSkill)
        return res
            .status(404)
            .json({ message: "Either Project or Skill not found" });
    let updatedProject;
    try {
        locatedProject.technologies.push(locatedSkill);
        updatedProject = await locatedProject.save();
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    if (!updatedProject)
        return res
            .status(500)
            .json({ message: "Unable to add skill to project" });
    return res.status(200).json({
        message: "Skill added to project successfully",
        data: updatedProject,
    });
};

const getSkills = async (req, res, next) => {
    let skills;
    try {
        skills = await Skill.find();
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    if (!skills) return res.status(404).json({ message: "No skills found" });
    return res.status(200).json({ data: skills });
};

const getProjects = async (req, res, next) => {
    const userEmail = req?.params?.email
        ? req?.params?.email
        : req?.user?.email;
    const { technologies } = req?.body;
    let authUser;
    try {
        authUser = await User.findOne({ email: userEmail }).populate({
            path: "projects",
            model: "Project",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
    if (!authUser) return res.status(404).json({ message: "User not found" });
    let projects;
    try {
        projects = authUser.projects;
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
    if (technologies && technologies.length) {
        try {
            projects = projects.filter((project) =>
                project.technologies.some((tech) =>
                    technologies.includes(tech.toString())
                )
            );
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: err });
        }
    }
    if (!projects)
        return res.status(404).json({ message: "User has no projects" });
    return res.status(200).json({ data: projects });
};

module.exports = {
    createProject,
    addProjectToUser,
    createSkill,
    addSkillToProject,
    getSkills,
    getProjects,
};
