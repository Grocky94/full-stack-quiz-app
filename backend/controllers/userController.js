import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Quiz from "../model/QuizModel.js";

export const Register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body.userData;
        // console.log(name, email, password, role)
        if (!name || !email || !password || !role) return res.status(404).json({ success: false, message: "all fields required" })

        const alreadyRegistered = await User.find({ email: email });
        if (alreadyRegistered?.length) {

            return res.status(404).json({ success: false, message: "email already used , try different email" })

        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashPassword, role })
        await user.save();
        return res.status(200).json({ success: true, message: "user registered", user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body.userData;
        if (!email || !password) return res.status(404).json({ success: false, message: "all fields required" })

        const user = await User.findOne({ email })
        if (!user) return res.status.json({ success: false, message: "email id not found" });

        const isPasswordRight = await bcrypt.compare(password, user.password);

        if (isPasswordRight) {
            const userObj = {
                name: user.name,
                email: user.email,
                userId: user._id,
                role: user.role
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
            if (token) {
                return res.status(200).json({ success: true, message: "user login success", user: userObj, token: token })
            }

        }
        return res.status(404).json({ success: false, message: "wrong password" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const Allquiz = async (req, res) => {
    try {
        const quiz = await Quiz.find({});
        if (quiz.length) {
            return res.status(200).json({ success: true, quiz })
        }
        return res.status(404).json({ success: false, message: "no quiz question set" })
    } catch (error) {
        return res.status(500).Json({ success: false, message: error.message })
    }
}