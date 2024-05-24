import express from 'express'
import { createJobs, deleteJobs, findYourJobs, getAllJobs, getSingleJob, updateJob } from '../Controllers/jobControllers.js';
import { isAutherize } from '../Middleware/auth.js';


const router = express.Router();


router.get("/getalljobs", getAllJobs);
router.get("/getsinglejob/:id", getSingleJob);
router.post("/createjobs", isAutherize, createJobs);
router.get("/yourownjobs", isAutherize, findYourJobs);
router.put("/updatejob/:id", isAutherize, updateJob);
router.delete("/deletejob/:id", isAutherize, deleteJobs);


export default router