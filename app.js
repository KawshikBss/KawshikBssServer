const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const systemRouter = require("./routers/systemRouter");
const projectRouter = require("./routers/projectRouter");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authRouter);
app.use("/users", userRouter);
app.use(systemRouter);
app.use(projectRouter);

app.get("/", (req, res, next) => {
    return res.send("Hello There");
});

mongoose
    .connect(
        "mongodb+srv://kawshikbss:eIjc9D3HhqwRvCpP@cluster0.q8x6dij.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(
        app.listen(5000, () =>
            console.log("Listining to http://localhost:5000")
        )
    )
    .catch((err) => console.error(err));
