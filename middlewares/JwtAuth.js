const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Unauthorized request" });
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedToken)
        return res.status(401).json({ message: "Unauthorized request" });
    req.user = verifiedToken;
    next();
};

module.exports = { verifyToken };
