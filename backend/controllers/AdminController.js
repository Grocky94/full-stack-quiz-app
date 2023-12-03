import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";
import Quiz from "../model/QuizModel.js";

export const AddQuiz = async (req, res) => {
    try {
        const { question, option1, option2, option3, option4, answer } = req.body.userData;
        const { token } = req.body
        // console.log(question, option1, option2, option3, option4, answer, token)
        if (!question || !option1 || !option2 || !option3 || !option4 || !answer || !token) return res.status(404).json({ success: false, message: "all fields are  required" })
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedData, "decode")

        const userId = decodedData?.userId;
        const user = await User.findById(userId);

        if (user?.role == "Admin") {

            const quiz = new Quiz({ question, option1, option2, option3, option4, answer, userId });

            if (quiz) {
                const options = {
                    option1, option2, option3, option4
                }
                await quiz.save()
                return res.status(200).json({ success: true, message: "question has added", question, options, answer, userId })

            }

        }
        return res.status(404).json({ success: false, message: "your not an admin" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}