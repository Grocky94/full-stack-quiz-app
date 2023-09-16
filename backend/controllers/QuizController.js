import Quiz from "../model/QuizModel.js";

export const QuizPager = async (req, res) => {
    try {
        const { page = 1, limit = 1 } = req.body
        // const quiz = await Quiz.find({})
        const singleQuiz = Quiz.find().page(page).Skip(1).Limit(limit).Lean()
        if (singleQuiz) {
            return res.status(200).json({ success: true, Quiz: singleQuiz })
        }
        return res.status(404).json({ success: false, message: "not found" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
}