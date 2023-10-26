const User = require("../model/User");
const jwt = require("jsonwebtoken");

const login = (req, res, next) => {
    const { email, password } = req.body;
    res.json({ email, password });
};

const signup = async (req, res, next) => {
    const { name, last_name, email, password, confirm_password } = req.body;
    if (password !== confirm_password)
        return res.json({ message: "Passwords do not match" });
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    if (existingUser)
        return res.json({
            message: "Email is already associated with an account",
        });
    var newUser = null;
    try {
        newUser = await User.create({ name, last_name, email, password });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
    if (newUser === null)
        return res.status(500).json({ message: "Error creating new user" });
    let token;
    try {
        token = jwt.sign(
            { _id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET
        );
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
    return res
        .status(201)
        .json({ token: token, data: newUser, message: "Signup successfull" });
};

module.exports = { login, signup };
