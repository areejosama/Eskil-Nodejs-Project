import { Router } from "express";
import {asynchandler} from '../../Middleware/errorhandler.js';
import { validation } from './../../Middleware/validation.js';
import * as usercontroller from './user.controller.js';
import { updatepassword } from "./user.validation.js";
import { auth } from './../../Middleware/auth.js';
import { endpoint } from './user.endpoint.js';

const router= Router();

router.patch('/updatepassword',auth(endpoint.Update),validation(updatepassword),asynchandler(usercontroller.updatepassword))
router.delete('/deleteaccount', auth(endpoint.Delete),asynchandler(usercontroller.deleteaccount))
export default router;