const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    contentType: String,
    label: String,
    title: String,
    href: String,
    code: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodeSnippet",
        required: false,
    },
});

module.exports = mongoose.model("File", fileSchema);
