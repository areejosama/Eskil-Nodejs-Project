import { Router } from "express";
import {asynchandler} from '../../Middleware/errorhandler.js';
import * as authcontroller from './auth.controller.js';
import { validation } from './../../Middleware/validation.js';
import { Verification, forgetpassword, sendcode, signin, signup } from "./auth.validation.js";

const router= Router();

router.post('/signup', validation (signup),asynchandler(authcontroller.signup))
router.post('/Verification', validation (Verification),asynchandler(authcontroller.Verification))
router.post('/signin',validation (signin) ,asynchandler(authcontroller.signin))
router.get('/sendcode', validation(sendcode), asynchandler(authcontroller.sendcode))
router.post('/resetpassword', validation(forgetpassword),asynchandler(authcontroller.forgetpassword))
export default router;
