import { Router } from "express"
import { auth } from "../../Middleware/auth.js";
import { endpoint } from "../category/category.endpoint.js";
import { HME, filevalidation, mymulter } from "../../Services/multer.js";
import { asynchandler } from "../../Middleware/errorhandler.js";
import * as categoryrouter from './category.controller.js'
import { validation } from "../../Middleware/validation.js";
import { deletecategory, updatecategory } from "./category.validation.js";
import  subcategoryrouter  from "../subcategory/subcategory.route.js";

const router= Router();
router.use('/:categoryid/subcategory', subcategoryrouter)
router.post('/createcategory',auth(endpoint.Add), mymulter(filevalidation.image).single('image'),HME, asynchandler(categoryrouter.createcategory))
router.delete('/deletecategory/:categoryid', auth(endpoint.Delete),validation(deletecategory), asynchandler(categoryrouter.deletecategory))
router.put('/updatecategory/:categoryid', auth(endpoint.Update), validation(updatecategory), mymulter(filevalidation.image).single('image'),HME,asynchandler(categoryrouter.updatecategory) )
router.get('/allcategories', asynchandler(categoryrouter.allcategories))
export default router;