import mongoose, { Schema } from "mongoose";

const QuizSchema = new Schema({
    question: {
        type: String
    },
    option1: {
        type: String
    },
    option2: {
        type: String
    },
    option3: {
        type: String
    },
    option4: {
        type: String
    },
    answer: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})
export default mongoose.model("quiz", QuizSchema)