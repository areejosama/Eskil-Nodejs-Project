import { Router } from "express"
import { auth } from "../../Middleware/auth.js";
import { endpoint } from "../subcategory/subcategory.endpoint.js";
import { HME, filevalidation, mymulter } from "../../Services/multer.js";
import { asynchandler } from "../../Middleware/errorhandler.js";
import * as subcategoryrouter from './subcategory.controller.js'
import { validation } from "../../Middleware/validation.js";
import { createsubcategory, deletesubcategory, getallsubcats, updatesubcategory } from "./subcategory.validation.js";

const router= Router({mergeParams:true});

router.post('/createsubcategory',validation(createsubcategory),auth(endpoint.Add), mymulter(filevalidation.image).single('image'),HME, asynchandler(subcategoryrouter.createsubcategory))
router.delete('/deletesubcategory/:subcategoryid',validation(deletesubcategory), auth(endpoint.Delete), asynchandler(subcategoryrouter.deletesubcategory))
router.put('/updatecategory/:subcategoryid', auth(endpoint.Update), validation(updatesubcategory), mymulter(filevalidation.image).single('image'),HME,asynchandler(subcategoryrouter.updatesubcategory) )
router.get('/allsubcategories', validation(getallsubcats),asynchandler(subcategoryrouter.allsubcategories))

export default router;