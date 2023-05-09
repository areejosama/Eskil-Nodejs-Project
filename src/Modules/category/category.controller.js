import slugify from "slugify";
import cloudinary from "../../Services/cloudinary.js";
import { categorymodel } from "../../../DB/Models/category.model.js";
import { pagination } from "../../Services/pagination.js";

export const createcategory=async(req,res,next)=>{
    if(req.file){
        const {name}=req.body;
        if(req.body.name.length >=3){
            var slug=slugify(name);
        }else{
            return next(new Error('Name length must be equal or more than 3 digidts'))
        }
        const {secure_url, public_id}= await cloudinary.uploader.upload(req.file.path,{folder:'Eskil/Categories'})
        const category= await categorymodel.create({name, slug, createdby:req.user._id, updatedby:req.user._id,image:secure_url, imagepublicid:public_id})
        if(category){
            return res.status(200).json({message:'Category Created Successfully'})
        }else{
            return next (new Error('Failed to create the category',{cause:400}))
        }
    }else{
        return next (new Error('Image is required',{cause:400}))
    }

}

export const deletecategory= async(req,res,next)=>{
    const {categoryid}=req.params;
    const cat= await categorymodel.findOne({_id:categoryid})
    if(cat){
        await cloudinary.uploader.destroy(cat.imagepublicid)
        const deletecat= await categorymodel.deleteOne({_id:categoryid})
        if(deletecat){
            return res.status(200).json({message:'Category Deleted Successfully'})
        }else{
            return next (new Error('Unable to delete the category',{cause:400}))
        }
    }else{
        return next(new Error('Category not found',{cause:400}))
    }
}

export const updatecategory= async (req,res,next)=>{
    const {categoryid}=req.params;
    const cat= await categorymodel.findOne({_id:categoryid});
    if(!cat){
        return next(new Error('Category not found',{cause:400}))
    }else{
        if(req.body.name.length >=3){
            req.body.slug=slugify(req.body.name)
        }else{
            return next(new Error('Name length must be equal or more than 3 digidts'))
        }
        if(req.file){
            const {secure_url, public_id}=await cloudinary.uploader.upload(req.file.path,{folder:'Eskil/Categories'})
            req.body.image=secure_url;
            req.body.imagepublicid=public_id;
        }
        req.body.updatedby=req.user._id;
        const updatedcategory= await categorymodel.findOneAndUpdate({_id:categoryid}, req.body, {new:false})
        if(req.file){
            await cloudinary.uploader.destroy(updatedcategory.imagepublicid)
        }
        if(!updatedcategory){
            return next(new Error ("Faild to Update Category", {cause:400}))
        }else{
            res.status(200).json({message:'Category Updated Successfully', updatedcategory})
        }
    }
}

 export const allcategories= async (req,res,next)=>{
    const {page, size}=req.query;
    const{limit,skip}= pagination(page, size)
    const allcategories= await categorymodel.find({}).limit(limit).skip(skip).select('name image');
    if(allcategories){
        return res.status(200).json({message:'Success', allcategories})
    }else{
        return next(new Error ("Faild To Get All Categories", {cause:400}))
    }
 }