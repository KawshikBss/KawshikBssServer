const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
    codeType: String,
    lines: [String],
});

module.exports = mongoose.model("CodeSnippet", codeSchema);
