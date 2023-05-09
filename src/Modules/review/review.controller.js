import { ordermodel } from "../../../DB/Models/order.model.js";
import { reviewmodel } from "../../../DB/Models/review.model.js";

export const addreview= async(req,res,next)=>{
    const {_id}=req.user;
    const {productid}=req.params;
    const {comment, rating}=req.body;

    const checkreview= await reviewmodel.findOne({userid:_id, productid})
   if(checkreview){
     return next (new Error ('your review alreay exist!', {cause:409}))
   }else{
     const checkorder= await ordermodel.findOne({userid:_id, "products.productid":productid, orderstatus: 'delivered'})
     if(!checkorder){
        return next(new Error('you can not review!',{cause:400}))
     }else{
        const userreview= await reviewmodel.create({comment, rating, userid:_id, productid})
        return res.status(200).json({message:'success', userreview})
     }
   }
}

export const getreviews=async(req,res,next)=>{
   const {productid}=req.params;
   const review= await reviewmodel.find({productid}).select('-_id comment rating');
   if(review){
      return res.status(200).json({message:'success',review})
   }else{
      return next (new Error('unable to get reviews', {cause:400}))
   }
}