import User from "../Modal/user.schema.js"
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;
        if (!name || !email || !password) return res.send("Fields are unfilled..")

        const isUserExist = await User.findOne({
            email
        })
        if (isUserExist) {
            return res.json({
                status: 404,
                message: "Email already used try different one.."
            })
        }
        const newUser = new User({
            name,
            email,
            password
        });
        await newUser.save();
        return res.json({
            status: 200,
            message: "Regiseration Complete."
        })
    } catch (error) {
        return res.send(error)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.send("Fields are unfilled..")

        const user = await User.findOne({ email, password }).select("-password");

        // console.log("Before token", user)
        // console.log(user);

         const payload = { id: user._id }

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        // console.log(token, "- token")
        if (user) {
            return res.json({ status: 200, message: "Login successfull." ,token:token})
        }
        return res.send("Credentials wrong..")
    } catch (error) {
        return res.send(error)
    }
}