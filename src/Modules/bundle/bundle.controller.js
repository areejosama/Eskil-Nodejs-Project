import slugify from "slugify";
import { productmodel } from "../../../DB/Models/product.model.js";
import cloudinary from './../../Services/cloudinary.js';
import { bundlemodel } from "../../../DB/Models/bundle.model.js";
import { pagination } from "../../Services/pagination.js";

export const createbundle= async (req,res,next)=>{
    let sum=0;
       if(!req.file){
           return next (new Error('Bundle Image Is Required', {cause:400}))
       }else{
         const {name, productsid, quantity, SKU, discount, dealexpiredate}=req.body;
         
         if(req.body.name.length >=3){
            req.body.slug= slugify(name); 
        }else{
            return next(new Error('Name length must be equal or more than 3 digidts'))
        }
             req.body.SKU=SKU;
             req.body.stock=quantity
             req.body.createdby=req.user._id;
             req.body.updatedby=req.user._id;
             req.body.dealexpiredate=dealexpiredate;

             for(let i=0; i<productsid.length; i++){
                const checkpro= await productmodel.findOne({_id:productsid[i], stock:{$gte:quantity}})
                //res.json(checkpro)
                if(!checkpro){
                    return next (new Error('Product not found, or Quantity greater than Stock', {cause:400}))
                }else{
                  sum+=checkpro.finalprice;
                }
             }
             req.body.price=sum;
             req.body.totalprice= (sum - (sum * ((discount || 0)/100)));

             const {secure_url, public_id}=await cloudinary.uploader.upload(req.file.path,{folder:'Eskil/Bundles'})
             req.body.image=secure_url
             req.body.imagepublicid=public_id

             const bundle= await bundlemodel.create(req.body)
             if(bundle){
                return res.status(200).json({message:'Bundle Created Successfully',bundle})
             }else{
                return next (new Error('Unable to create the bundles, Please try again',{cause:400}))
             }
       }
}

export const deletebundle= async (req,res,next)=>{
    const{bundleid}=req.params;
    const bundle= await bundlemodel.findById(bundleid)
    if(!bundle){
        return next (new Error('Bundle not fund', {cause:400}))
    }else{
       // res.json(bundle.imagepublicid)
        await cloudinary.uploader.destroy(bundle.imagepublicid)
        const deletebundle= await bundlemodel.deleteOne({_id:bundleid})

        if(deletebundle){
            return res.status(200).json({message:'Bundle Successfully Deleted'})
        }else{
            return next(new Error('Unable to delete the bundle', {cause:400}))
        }
    }
}

export const updateundle= async(req,res,next)=>{
    let sum=0;
    const {bundleid}=req.params;
    const bundle= await bundlemodel.findById(bundleid)
    if(!bundle){
        return next (new Error('Bundle not fund', {cause:400}))
    }else{
        const {name, productsid, quantity, SKU, discount, dealexpiredate, price}=req.body; 
        if(req.body.name.length >=3){
            req.body.slug= slugify(name); 
        }else{
            return next(new Error('Name length must be equal or more than 3 digidts'))
        }
        if(SKU){
            req.body.SKU=SKU; 
        }
        if(productsid){
            for(let i=0; i<productsid.length; i++){
                const checkpro= await productmodel.findOne({_id:productsid[i], stock:{$gte:quantity}})
                if(!checkpro){
                    return next (new Error('Product not found, or Quantity greater than Stock', {cause:400}))
                }else{
                  sum+=checkpro.finalprice;
                }
             }
             req.body.stock=quantity
             req.body.price=sum;
             req.body.totalprice= (sum - (sum * ((discount || 0)/100)));
        }else{
            if(price && discount){
                req.body.totalprice= (price - (price * (discount /100)));
            }else if (price){
                req.body.totalprice= (price - (price * (bundle.discount /100)));
            }else if(discount){
                req.body.totalprice= (bundle.price - (bundle.price * (discount /100))); 
            }
            if(quantity){
                let newstock= quantity-bundle.solditems;
                if(newstock >0){
                    req.body.stock=newstock;
                }else{
                    req.body.stock=0;
                }
            }
        }
        if(dealexpiredate){
            req.body.dealexpiredate=dealexpiredate;
        }
       
         if(req.file){
            const {secure_url, public_id}= await cloudinary.uploader.upload(req.file.path, { folder:'Eskil/Bundles'});
            req.body.image=secure_url;
            req.body.imagepublicid=public_id;
         }

         req.body.updatedby=req.user._id;

         const updatedbundle= await bundlemodel.findOneAndUpdate({_id:bundleid}, req.body, {new:false})

         if(req.file){
            await cloudinary.uploader.destroy(updatedbundle.imagepublicid)
         }

         if(updatedbundle){
            return res.status(200).json({message:'Bundle Updated Successfully'})
         }else{
            return next (new Error('Unable to update the bundle', {cause:400}))
         }
    }
}

export const getallbundles= async(req,res,next)=>{
    const{page,size}=req.query;
    const {limit, skip}=pagination(page,size)

    const allbundles= await bundlemodel.find({}).limit(limit).skip(skip).select('image')

    if(allbundles){
        return res.status(200).json({message:'Success', allbundles})
    }else{
        return next(new Error('Unable to get all bundles', {cause:400}))
    }
}