const mongoose = require("mongoose");

const contactItemSchema = new mongoose.Schema({
    title: String,
    type: String,
    href: String,
});

const ContactItem = mongoose.model("ContactItem", contactItemSchema);

module.exports = ContactItem;
