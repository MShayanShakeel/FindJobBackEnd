import express from 'express'
import {
    employerGetAllApplication,
    jobSeekerGetAllApplication,
    jobSeekerDeleteOwnApplication,
    applyingJob
} from '../Controllers/applicationControllers.js';
import { isAutherize } from "../Middleware/auth.js"

const router = express.Router();

router.get('/emplloyegetall', isAutherize, employerGetAllApplication)
router.get('/jobgetall', isAutherize, jobSeekerGetAllApplication)
router.delete('/jobseekerdelete/:id', isAutherize, jobSeekerDeleteOwnApplication)
router.post('/applyjobs', isAutherize, applyingJob)

export default router