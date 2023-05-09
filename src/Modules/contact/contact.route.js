import { Router } from "express";
import { auth } from "../../Middleware/auth.js";
import { endpoint } from "./contact.endpoint.js";
import { asynchandler } from "../../Middleware/errorhandler.js";
import * as contactrouter from './contact.controller.js'
import { validation } from "../../Middleware/validation.js";
import { updatestatus } from "./contact.validation.js";

const router= Router();
router.post('/sendmessage',asynchandler(contactrouter.sendmessage))
router.patch('/updatemessage/:mesgid',validation(updatestatus),auth(endpoint.Update), asynchandler(contactrouter.updatestatus))
router.get('/allmessages',auth(endpoint.Update),asynchandler(contactrouter.getallmessages))
export default router;