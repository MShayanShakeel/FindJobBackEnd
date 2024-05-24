import { catchAsynceError } from "../Middleware/catchAsynceError.js"
import ErrorHandle from "../Middleware/error.js";
import { Application } from "../Models/applicationScheem.js";
import cloudinary from "cloudinary"
import { Job } from "../Models/jobScheem.js";


// (1) EXMPLOYE SEE JOBSEEKER  APPLICATION 
export const employerGetAllApplication = catchAsynceError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeking") {
        return next(new ErrorHandle("Job Seeking is not allow to acces this route", 400))
    }
    const { _id } = req.user;
    const seeApplication = await Application.find({ "employerID.user": _id })
    res.status(200).json({
        success: true,
        seeApplication
    })
})

// (2) JOB SEEKER  SEE OWN  APPLICATION 
export const jobSeekerGetAllApplication = catchAsynceError(async (req, res, next) => {
    const { role } = req.user
    if (role === "Employer") {
        return next(new ErrorHandle("Employer not accces this route!", 400))
    }
    const { _id } = req.user
    const seeApplication = await Application.find({ "applicantID.user": _id })
    res.status(200).json({
        success: true,
        seeApplication
    })
})



// (3) JOB SEEKER  DELETE YOUR OWN APPLICATION 
export const jobSeekerDeleteOwnApplication = catchAsynceError(async (req, res, next) => {
    const { role } = req.user
    if (role === "Employer") {
        return next(new ErrorHandle("Employer not delete any Job seeker application!", 400))
    }
    const { id } = req.params;
    const deleteApplication = await Application.findById(id)
    if (!deleteApplication) {
        return next(new ErrorHandle("Oops, Application is not found!", 404))
    }
    await deleteApplication.deleteOne()
    res.status(200).json({
        success: true,
        message: "Application deleted Succesfully!"
    })
})



// (3)APPLYING GOT JOB APPLICATION 
export const applyingJob = catchAsynceError(async (req, res, next) => {
    const { role } = req.user
    if (role === "Employer") {
        return next(new ErrorHandle("Employer not applyed to any job", 400))
    }
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return next(new ErrorHandle("Resume File Required!", 400))
    // }
    // const { resume } = req.files;
    // const allowResumeFormat = ['image/png', 'image/jpg', 'image/webp'];
    // if (!allowResumeFormat.includes(resume.mimetype)) {
    //     return next(new ErrorHandle("Invalid file type , Resume format only jpg, png, webp!", 400))
    // }
    // const cloudinaryResponce = await cloudinary.uploader.upload(
    //     resume.tempFileDir
    // );
    // if (!cloudinaryResponce || cloudinaryResponce.error) {
    //     console.error("Cloudinary Error ", cloudinaryResponce.error || "Unknown Error")
    //     return next(new ErrorHandle("Falied to upload resume!", 500))
    // }
    const { name, email, coverLetter, phone, address, JobId } = req.body;
    const applicantID = {
        user: req.user._id,
        role: "Job Seeking"
    }
    if (!JobId) {
        return next(new ErrorHandle("Job not found!", 404))
    }
    const jobDetails = await Job.findById(JobId);
    if (!jobDetails) {
        return next(new ErrorHandle("Job not found!", 404))
    }
    const employerID = {
        user: jobDetails.postedBy,
        role: "Employer",
    }
    if (!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID) {  //resume
        return next(new ErrorHandle("SomeThing is missing!", 400))
    }
    const application = await Application.create({
        name, email, coverLetter, phone, address, applicantID, employerID,
        // resume: {
        //     public_id: cloudinaryResponce.public_id,
        //     url: cloudinaryResponce.secure_url,
        // }
    })
    res.status(200).json({
        success: true,
        message: "Application Submitted!",
        application
    })

})
