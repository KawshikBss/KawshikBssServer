const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    title: String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "ContactItem" }],
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
