import express from 'express'
import { Logout, Login, register, getUser } from '../Controllers/userControllers.js';
import { isAutherize } from "../Middleware/auth.js"

const router = express.Router();

router.post('/register', register);
router.post('/login', Login);
router.get('/logout', isAutherize, Logout);
router.get('/getUser', isAutherize, getUser);

export default router;
