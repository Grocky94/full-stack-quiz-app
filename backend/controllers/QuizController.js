import Quiz from "../model/QuizModel.js";

export const QuizPager = async (req, res) => {
    try {
        const { page, limit = 1 } = req.body
        const skip = (parseInt(page) - 1 * parseInt(limit))
        // const singleQuiz = await Quiz.find({})
        const singleQuiz = await Quiz.find({}).skip(skip).limit(limit).lean()
        if (singleQuiz) {
            return res.status(200).json({ success: true, Quiz: singleQuiz })
        }
        return res.status(404).json({ success: false, message: "not found" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
}

export const CheckAnswer = async (req, res) => {
    try {

        const { _id, option } = req.body;
        // console.log(_id, option)
        const received = await Quiz.findOne({ _id })
        let value = received.get(option)
        // console.log(value, "value from checkAnswer")
        const answer = received?.answer
        if (answer == value) {
            return res.status(200).json({ success: true })
        } else {
            return res.status(200).json({ success: false })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const TotalQuiz = async (req, res) => {
    try {
        const finder = await Quiz.find({})
        if (finder) {
            return res.status(200).json({ success: true, Quiz: finder })
        } else {
            return res.status(404).json({ success: false, message: "not found" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}