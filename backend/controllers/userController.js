import User from "../model/UserModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
// import Quiz from "../model/QuizModel.js";


export const Register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body.userData;
        const { result = 0 } = req.body
        // console.log(name, email, password, role)
        if (!name || !email || !password || !role) return res.status(404).json({ success: false, message: "all fields required" })

        const alreadyRegistered = await User.find({ email: email });
        if (alreadyRegistered?.length) {

            return res.status(404).json({ success: false, message: "email already used , try different email" })

        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashPassword, role, result })
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
                role: user.role,
                result: user.result
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

// export const Allquiz = async (req, res) => {
//     try {
//         const quiz = await Quiz.find({});
//         if (quiz.length) {
//             return res.status(200).json({ success: true, quiz })
//         }
//         return res.status(404).json({ success: false, message: "no quiz question set" })
//     } catch (error) {
//         return res.status(500).json({ success: false, message: error.message })
//     }
// }

export const CurrentUser = async (req, res) => {
    try {
        const { token } = req.body

        if (!token) return res.status(404).json({ success: false, message: "token not received" })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decodedData, "checker")

        if (!decodedData) {
            return res.status(404).json({ success: false, message: "authentication error" })
        }
        const userId = decodedData?.userId
        console.log(userId)
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" })
        }
        const userObj = {
            name: user?.name,
            email: user?.email,
            userId: user?._id,
            role: user?.role
        }
        return res.status(200).json({ success: true, user: userObj })


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
        console.log(error)
    }
}

export const SubmitAnswer = async (req, res) => {
    try {
        const { token, ans } = req.body

        if (!token) return res.status(404).json({ success: false, message: "token not received" })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decodedData, "checker")

        if (!decodedData) {
            return res.status(404).json({ success: false, message: "authentication error" })
        }
        const userId = decodedData?.userId
        console.log(userId)
        const submited = await User.findByIdAndUpdate(userId, { result: ans })

        if (!submited) {
            return res.status(404).json({ success: false, message: "user not found" })
        }

        return res.status(200).json({ success: true, result: submited.result, message: " Submitted successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}