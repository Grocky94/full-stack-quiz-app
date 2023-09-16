import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    }
})

export default mongoose.model("user", userSchema)