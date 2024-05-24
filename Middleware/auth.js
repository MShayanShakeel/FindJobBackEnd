import { catchAsynceError } from "./catchAsynceError.js"
import ErrorHandler from './error.js'
import jwt from 'jsonwebtoken'
import { User } from '../Models/UserScheem.js'

export const isAutherize = catchAsynceError(async (req, res, next) => {
    // const { token } = req.cookies;
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
        return next(new ErrorHandler('User not Autherize', 400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decoded.id);

    next();
})