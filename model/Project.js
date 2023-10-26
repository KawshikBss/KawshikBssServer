const { default: mongoose } = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    description: String,
    href: String,
    technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
