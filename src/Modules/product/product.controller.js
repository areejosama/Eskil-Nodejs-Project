import slugify from "slugify";
import { subcategorymodel } from "../../../DB/Models/subcategory.model.js";
import { brandmodel } from "../../../DB/Models/brand.model.js";
import cloudinary from "../../Services/cloudinary.js";
import { productmodel } from "../../../DB/Models/product.model.js";

export const createproduct= async(req,res,next)=>{

  if(!req.files?.length){
    return next (new Error ('Images are Required', {cause:400}))
  }else{

    const{name, brandid, categoryid, subcategoryid, discount, price, quantity, SKU, discountexpiredate, description }=req.body;
    if(req.body.name.length >=3){
        req.body.slug= slugify(name); 
    }else{
        return next(new Error('Name length must be equal or more than 3 digidts'))
    }
    req.body.stock=quantity;
    req.body.finalprice= (price - (price * ((discount || 0)/100)));
 
    const category= await subcategorymodel.findOne({_id:subcategoryid, categoryid})
    if(!category){
       return next(new Error('Category or Subcategory not found'))
    }else{
        const brand= await brandmodel.findById(brandid);
        if(!brand){
            return next(new Error('Brand not found')) 
        }else{
            let images=[];
            let imagespublicid=[];
            for (const file of req.files) {
                const {public_id, secure_url}= await cloudinary.uploader.upload(file.path,{folder:'Eskil/Products'});
                images.push(secure_url);
                imagespublicid.push(public_id)
            }
            req.body.images=images;
            req.body.imagespublicid=imagespublicid;
            req.body.createdby=req.user._id
            req.body.updatedby=req.user._id

            const product= await productmodel.create(req.body)
            if(product){
                res.status(200).json({message:'success', product})
            }else{
                return next(new Error ('unable to add the product, please try again', {casue:400}))
            }
        }
    }

  }
}

export const deleteproduct= async (req,res,next)=>{
        const {productid}=req.params;
        const product= await productmodel.findById(productid);
        if(!product){
            return next (new Error('Product not found', {cause:400}));
        }else{
            for (const imagepublicid of product.imagespublicid) {
                await cloudinary.uploader.destroy(imagepublicid)
            }
            const updatedprodcut= await productmodel.findOneAndDelete({_id:productid})
            return res.status(200).json({message:'Product Deleted Successfully'})
        }
}

export const updateproduct= async (req,res,next)=>{
    const {productid}=req.params;
    const product= await productmodel.findById(productid);
    if(!product){
      return next (new Error ("Product not found", {cause:400}))
      }
       const {name, quantity, price, discount, categoryid, subcategoryid, brandid, SKU, discountexpiredate, description }=req.body;
         if(req.body.name.length >=3){
        req.body.slug= slugify(name); 
        }else{
        return next(new Error('Name length must be equal or more than 3 digidts'))
        }
        if(quantity){
           let newstock= quantity-product.solditems;
           if(newstock >0){
               req.body.stock=newstock;
           }else{
               req.body.stock=0;
           }
       }
      if(price && discount){
           req.body.finalprice= (price - (price * (discount /100)));
       }else if (price){
           req.body.finalprice= (price - (price * (product.discount /100)));
       }else if(discount){
           req.body.finalprice= (product.price - (product.price * (discount /100))); 
       }

        if (categoryid && subcategoryid){
           const category= await subcategorymodel.findOne({_id:subcategoryid, categoryid})  
           if(!category){
               return next (new Error ("category or sub category not found", {cause:400}))
           }  
       }

        if(brandid){
           const brand = await brandmodel.findOne({_id:brandid})
           if(!brand){
               return next (new Error ("brand not found", {cause:400}))
           }
       }

        if(req.files?.length){
           const images=[];
           const imagespublicid=[];
           for (const file of req.files) {
               const {secure_url, public_id}=await cloudinary.uploader.upload(file.path, {folder:'Eskil/Products'})
               images.push(secure_url);
               imagespublicid.push(public_id)
           }
           req.body.images=images
           req.body.imagespublicid=imagespublicid
           req.body.updatedby=req.user._id
          }

       const updatedproduct= await productmodel.findOneAndUpdate({_id:productid},req.body,{new:false})

       if(updatedproduct){
           for (const imageId of product.imagespublicid) {
               await cloudinary.uploader.destroy(imageId)
           }
           res.status(200).json({message:'success', updatedproduct})
       }else{
           return next(new Error("unable to update the product", {cause:400}))
       }
}

export const getallproducts= async (req,res,next)=>{
    const allproducts= await productmodel.find({}).populate([
    {
        path:'categoryid',
        select:'name'
    },
    {
        path:'subcategoryid',
        select:'name'
    },
    {
        path:'brandid',
        select:'name'
    },
    {
        path: "reviews",
    }
])

if(allproducts){
    res.status(200).json({message:'success', allproducts})
}else{
    return next(new Error ("Unable to gell all products"))
}

}