import { catchAsynceError } from "../Middleware/catchAsynceError.js"
import ErrorHandle from "../Middleware/error.js";
import { Job } from "../Models/jobScheem.js"


//GET ALL GROUPS  API START HERE 

export const getAllJobs = catchAsynceError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false });
    res.status(200).json({
        success: true,
        message: "find Succesfully",
        jobs
    })
})


// ADD JOBS API START HERE 

export const createJobs = catchAsynceError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeking") {
        return next(new ErrorHandle("Job Seeking not Allow to create jobs!"), 400)
    }
    const { salaryTo, salaryFrom, fixSalary, location, city, country, catogary, description, title, postionTime } = req.body
    console.log(req.body)

    if (!title || !description || !catogary || !country || !city || !location) {
        return next(new ErrorHandle("Please Provide Complete job details"), 400)
    }
    if ((!salaryTo || !salaryFrom) && !fixSalary) {
        return next(new ErrorHandle("Please Provide RangeSalary OR FixSalary"), 400)
    }

    if (salaryTo && salaryFrom && fixSalary) {
        return next(new ErrorHandle("Cannot Enter Fixsalary or rangesalary"), 400)
    }
    console.log(req.user, "sayann");
    const postedBy = req.user._id;
    console.log(postedBy, "postedBy");
    const job = await Job.create({
        salaryTo, salaryFrom, fixSalary, location, city, country, catogary, description, title, postedBy,
    })
    res.status(200).json({
        success: true,
        message: "Job Posted Succesfully!",
        job,
    })
})




//SEE ONLY YOUR OWN JOBS API START HERE 

export const findYourJobs = catchAsynceError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeking") {
        return next(new ErrorHandle("Job Seeking not Allow to create jobs!"), 400)
    }
    const myJobs = await Job.find({ postedBy: req.user._id })
    res.status(200).json({
        success: true,
        myJobs,
    })
})





//UPDATE YOUR OWN JOBS API START HERE 

export const updateJob = catchAsynceError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeking") {
        return next(new ErrorHandle("Job Seeking not Allow to create jobs!"), 400)
    }
    const { id } = req.params;
    console.log(id, "id ");
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandle("Oops, Job is not found"), 404)
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "Job Update Succesfully!",
        job
    })
})



//DELETE YOUR OWN JOBS API START HERE 

export const deleteJobs = catchAsynceError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeking") {
        return next(new ErrorHandle("Job Seeking not Allow to create jobs!"), 400)
    }
    const { id } = req.params;
    let job = await Job.findById(id)
    if (!job) {
        return next(new ErrorHandle("Oops, Job is not found"), 404)
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job Delete Succesfully!"
    })
})



export const getSingleJob = catchAsynceError(async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return next(new ErrorHandle("Oops, Job is not found"), 400)
        }
        res.status(200).json({
            success: true,
            job,
            message: "Job Found Sunnesfully"
        })
    } catch (error) {
        return next(new ErrorHandle("Oops, Invalid ID/Job not found"), 400)
    }
})