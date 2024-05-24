import mongoose from "mongoose";

const jobschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, "Title Length must be more they 3 cheracter"],
        maxLength: [50, "Title Length must be less they 50 cheracter"]
    },
    description: {
        type: String,
        required: true,
        minLength: [20, "Title Length must be more they 20 cheracter"],
        maxLength: [350, "Title Length must be less they 350 cheracter"]
    },
    catogary: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        required: true,
        minLength: [10, "Title Length must be more they 10 cheracter"],
        maxLength: [350, "Title Length must be less they 350 cheracter"]
    },
    fixSalary: {
        type: String,
        required: true,
        minLength: [4, "Title Length must be more they 4 cheracter"],
        maxLength: [350, "Title Length must be less they 350 cheracter"]
    },

    salaryFrom: {
        type: String,
        minLength: [4, "Title Length must be more they 4 cheracter"],
        maxLength: [350, "Title LengtFh must be less they 350 cheracter"]
    },

    salaryTo: {
        type: String,
        minLength: [4, "Title Length must be more they 4 cheracter"],
        maxLength: [350, "Title Length must be less they 350 cheracter"]
    },
    expired: {
        type: Boolean,
        default: false,
    },
    postionTime: {
        type: Date,
        default: Date.now(),
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
})

export const Job = mongoose.model("Job", jobschema);