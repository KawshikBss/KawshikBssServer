const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: String,
    last_name: String,
    email: String,
    password: String,
    contactData: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
    userMeta: [{ type: mongoose.Schema.Types.ObjectId, ref: "Directory" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

userSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) return next();
    bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR), (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
