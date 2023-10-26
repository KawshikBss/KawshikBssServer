const { default: mongoose } = require("mongoose");

const skillSchema = new mongoose.Schema({
    title: String,
    icon: String,
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
