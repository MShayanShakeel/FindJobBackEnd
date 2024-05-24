import { catchAsynceError } from "../Middleware/catchAsynceError.js"
import ErrorHandle from '../Middleware/error.js';
import { User } from '../Models/UserScheem.js'
import { sendToken } from '../Utilits/jwtToken.js';

export const register = catchAsynceError(async (req, res, next) => {
    const { name, email, password, role, phone } = req.body;
    console.log(req.body, "body")

    if (!name || !email || !password || !role || !phone) {
        return next(new ErrorHandle("SomeThing is missing!"))
    }
    const isEmail = await User.findOne({ email })
    if (isEmail) {
        return next(new ErrorHandle("Email Already Exist"))
    }
    const user = await User.create({
        name, email, password, role, phone
    })
    sendToken(user, 200, res, "User Registered Successfully")
})



// LOGIN API HERE

export const Login = catchAsynceError(async (req, res, next) => {
    const { email, password, role } = req.body;
    console.log(req.body);
    if (!email || !password || !role) {
        return next(new ErrorHandle("Email or pass is missing"), 400)
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandle("Invalid Email or password"), 400)
    }
    const isPAsswordMatch = await user.compairPassword(password)

    if (!isPAsswordMatch) {
        return next(new ErrorHandle("Invalid Email or password"), 400)
    }
    if (user.role !== role) {
        return next(new ErrorHandle("Invalid Selected Role"), 400)
    }
    sendToken(user, 200, res, "Login succesfully")
    console.log(user, "user");
})


export const Logout = catchAsynceError(async (req, res, next) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User Logged Out Succesfully!"
    })
})

export const getUser = catchAsynceError(async (req, res, next) => {
    const users = req.user;
    res.status(200).json({
        success: true,
        message: "User found Succesfully!",
        users
    })
})