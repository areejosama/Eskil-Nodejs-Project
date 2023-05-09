import slugify from "slugify";
import cloudinary from "../../Services/cloudinary.js";
import { subcategorymodel } from "../../../DB/Models/subcategory.model.js";
import { pagination } from "../../Services/pagination.js";
import { categorymodel } from "../../../DB/Models/category.model.js";

export const createsubcategory=async(req,res,next)=>{
    if(req.file){
        const {categoryid}=req.params;
        const cat= await categorymodel.findById(categoryid)
        if(cat){
            const {name}=req.body;
            if(req.body.name.length >=3){
                var slug=slugify(name);
            }else{
                return next(new Error('Name length must be equal or more than 3 digidts'))
            }
            const {secure_url, public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`Eskil/Subcategories`})
            const subcategory= await subcategorymodel.create({name, slug, categoryid,createdby:req.user._id, updatedby:req.user._id,image:secure_url, imagepublicid:public_id})
            if(subcategory){
                return res.status(200).json({message:'Subcategory Created Successfully'})
            }else{
                return next (new Error('Failed to create the Subcategory',{cause:400}))
            }
        }else{
            return next (new Error('Category Not Found',{cause:400}))
        }
     
    }else{
        return next (new Error('Image is required',{cause:400}))
    }

}

export const deletesubcategory= async(req,res,next)=>{
    const {categoryid,subcategoryid}=req.params;
    const subcat= await subcategorymodel.findOne({_id:subcategoryid})
    if(subcat){
        await cloudinary.uploader.destroy(subcat.imagepublicid)
        const deletesubcat= await subcategorymodel.findOneAndDelete({_id:subcategoryid, categoryid})
        if(deletesubcat){
            return res.status(200).json({message:'Subcategory Deleted Successfully'})
        }else{
            return next (new Error('Unable to delete the subcategory',{cause:400}))
        }
    }else{
        return next(new Error('Subcategory not found',{cause:400}))
    }
}

export const updatesubcategory= async (req,res,next)=>{
    const {categoryid,subcategoryid}=req.params;
    const subcat= await subcategorymodel.findOne({_id:subcategoryid});
    if(!subcat){
        return next(new Error('Subcategory not found',{cause:400}))
    }else{
        if(req.body.name.length >=3){
            req.body.slug=slugify(req.body.name)
        }else{
            return next(new Error('Name length must be equal or more than 3 digidts'))
        }
        if(req.file){
            const {secure_url, public_id}=await cloudinary.uploader.upload(req.file.path,{folder:'Eskil/Subcategories'})
            req.body.image=secure_url;
            req.body.imagepublicid=public_id;
        }
        req.body.updatedby=req.user._id;
        const updatedsubcategory= await subcategorymodel.findOneAndUpdate({_id:subcategoryid, categoryid}, req.body, {new:false})
        if(req.file){
            await cloudinary.uploader.destroy(updatedsubcategory.imagepublicid)
        }
        if(!updatedsubcategory){
            return next(new Error ("Faild to Update Category", {cause:400}))
        }else{
            res.status(200).json({message:'Category Updated Successfully', updatedsubcategory})
        }
    }
}

 export const allsubcategories= async (req,res,next)=>{
    const {categoryid}=req.params;
    const category= await categorymodel.findById(categoryid)
    if(category){
        const {page, size}=req.query;
        const{limit,skip}= pagination(page, size)
        const allsubcategories= await subcategorymodel.find({}).limit(limit).skip(skip).select('name image');
        if(allsubcategories){
            return res.status(200).json({message:'Success', allsubcategories})
        }else{
            return next(new Error ("Faild To Get All subcategories", {cause:400}))
        }
    }else{
        return next (new Error('Category Not Found',{cause:400}))
    }

 }