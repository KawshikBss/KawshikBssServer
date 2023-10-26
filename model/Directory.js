const mongoose = require("mongoose");

const directory = new mongoose.Schema({
    title: String,
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Directory" }],
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
});

module.exports = mongoose.model("Directory", directory);
