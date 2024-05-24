import mongoose, { mongo } from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Title Length must be more they 3 cheracter"],
        maxLength: [50, "Title Length must be less they 50 cheracter"]
    },
    email: {
        type: String,
        required: true,
        validator: [validator.isEmail, "Pleace Provide Valid Email"]
    },
    coverLetter: {
        type: String,
        required: true,
        minLength: [10, "CoverLetter Length must be more they 10 cheracter"],
        maxLength: [1000, "CoverLetter Length must be less they 1000 cheracter"]
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    // resume: {
    //     public_id: {
    //         type: String,
    //         required: true
    //     },
    //     url: {
    //         type: String,
    //         required: true
    //     }
    // },
    applicantID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: "Job Seeking",
        }
    },
    employerID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: "Employer",
        }
    },
})

export const Application = mongoose.model("Application", applicationSchema);