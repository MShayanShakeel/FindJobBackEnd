import mongoose from "mongoose";
import validator from "validator";
import bcrypt, { hash } from 'bcrypt';
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: [3, "Name must contain 3 words!"],
        maxLength: [30, "Name can not exceed 30 words"]
    },
    email: {
        type: String,
        require: true,
        validator: [validator.isEmail, "Please Provide Valid Email"],
    },
    password: {
        type: String,
        require: true,
        minLength: [8, "Password must contain 8 words!"],
        maxLength: [32, "Password can not exceed 32 words"]
    },
    phone: {
        type: Number,
        require: true,
    },
    role: {
        type: String,
        require: true,
        enum: ['Job Seeking', "Employer"]
    },
    creadeAt: {
        type: Date,
        default: Date.now,
    }

})


// HASHING PASSWORD 
userSchema.pre('save', async function (next) {
    if (this.isModified(this.password)) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// COMPARRING PASSWORD 
userSchema.methods.compairPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
}

//GENERATE JWT TOKEN 
userSchema.methods.getJwtToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })
}

export const User = mongoose.model('User', userSchema)