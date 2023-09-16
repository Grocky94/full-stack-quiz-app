import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import { Login, Register } from "./controllers/userController.js";
import { AddQuiz } from "./controllers/adminController.js";
import { QuizPager } from "./controllers/QuizController.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
dotenv.config();
app.use(cors());

app.get("/", (req, res) => {
    return res.send("Working")
});

app.post("/register", Register);
app.post("/login", Login)
app.post("/addQuiz", AddQuiz)
app.get("/quizPager", QuizPager)

mongoose.connect(process.env.mongoDb_Url).then(() => { console.log("connect to MongoDB Atlas") }).catch((err) => { console.log(err.message) });

app.listen(5000, () => {
    console.log("port listening on 5000")
})




