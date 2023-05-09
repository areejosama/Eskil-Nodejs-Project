
import { brandmodel } from '../../../DB/Models/brand.model.js';
import cloudinary from './../../Services/cloudinary.js';
import slugify from 'slugify';
import {pagination}  from '../../Services/pagination.js';

export const createbrand= async(req,res,next)=>{
    if(!req.file){
        return next(new Error ('Brand Image Is Required', {cause:400}))
    }else{
        const {name}=req.body;
        if(req.body.name.length >=3){
            var slug=slugify(name);
        }else{
            return next(new Error('Name length must be equal or more than 3 digidts'))
        }
        const {secure_url, public_id}= await cloudinary.uploader.upload(req.file.path,
            {folder:'Eskil/Brands'})
        const brand= await brandmodel.create({name, slug, createdby:req.user._id, updatedby:req.user._id, image:secure_url, imagepublicid: public_id})
        if(brand){
            return res.status(200).json({message:'Brand Created Successfully',brand })
        }else{
            return next (new Error('Failed To Add Brand, Try Again', {cause:400}))
        }
    }
}

export const deletebrand= async(req,res,next)=>{
    const {brandid}=req.params;
    const brand= await brandmodel.findById(brandid)
    if(brand){
        await cloudinary.uploader.destroy(brand.imagepublicid)
        const dbrand= await brandmodel.deleteOne({_id:brandid})
        if(dbrand){
            return res.status(200).json({message:'Brand Deleted Successfully'})
        }else{
            return next (new Error('Unable To Delete The Brand, Please Try Again', {cause:400}))
        }
    }else{
        return next (new Error('Brand Not Found', {cause:400})) 
    }
}

export const updatebrand=async(req,res,next)=>{
    const {brandid}=req.params;
    const brand= await brandmodel.findById(brandid)
    if(!brand){
        return next(new Error ("Brand not found", {cause:400}))
    }else{
        if(req.file){
            const {secure_url, public_id}= await cloudinary.uploader.upload(req.file.path, {folder:'Eskil/Brands'});
            req.body.image=secure_url;
            req.body.imagepublicid=public_id;
        }
        if(req.body.name.length>=3){
            req.body.slug=slugify(req.body.name);
        }else{
           
         return next(new Error('Name length must be equal or more than 3 digidts'))
    
        }
        req.body.updatedby=req.user._id
        const updatededbrand= await brandmodel.findOneAndUpdate({_id:brandid}, req.body, {new:false})
        if(req.file){
            await cloudinary.uploader.destroy(updatededbrand.imagepublicid)
        }
        if(!updatededbrand){
            return next(new Error ("Faild to update brand", {cause:400}))
        }else{
            res.status(200).json({message:'Brand Updated Successfully', updatededbrand})
        }
    }
}

export const getallbrands= async(req,res,next)=>{
    const {page,size}=req.query;
    const{limit,skip}=pagination(page,size)
    const allbrands= await brandmodel.find({}).limit(limit).skip(skip).select('-_id image')
    if(allbrands){
        return res.status(200).json({message:'Success',allbrands})
    }else{
        return next(new Error('Unable to get all brands',{cause:400}))
    }
}