import { bundlemodel } from "../../../DB/Models/bundle.model.js";
import { cartmodel } from "../../../DB/Models/cart.model.js";

export const addtocart= async (req,res,next)=>{
    const {_id}= req.user;
    const {products, bundles}=req.body;
    const cart= await cartmodel.findOne({userid:_id})
    if(!cart){
        const createcart= await cartmodel.create({userid:_id, products, bundles})
        res.status(200).json({message:'success',createcart})
    }else{
      if(products?.length){
        for (const product of products) {
          for(let i=0; i<cart.products.length; i++){
            if( product.productid != cart.products[i].productid){
                 cart.products.push(product)
                 break;
            }
          }    
        }
      }
      if(bundles?.length){
        for (const bundle of bundles) {
          for(let i=0; i<cart.bundles.length; i++){
            if(bundle.bundleid != cart.bundles[i].bundleid){
              cart.bundles.push(bundle)
              break;
            }
          }    
        }
      }
        
        const updatedcart= await cartmodel.findOneAndUpdate({userid:_id},{products:cart.products, bundles:cart.bundles},{new:true})
        res.status(200).json({message:'success',updatedcart})
    }
}

export const deletefromcart= async(req,res,next)=>{
    const {_id}=req.user;
    const cart= await cartmodel.findOne({userid:_id})
    if(!cart){
        return next(new Error('Cart not found', {cause:400}))
    }else{   
        const {products, bundles}=req.body;
        for (const product of products) {
          for(let i=0; i<cart.products.length; i++){
            if(product.productid == cart.products[i].productid){
                    const deletepro = await cartmodel.findOneAndUpdate(
                        { userid: _id },
                        { $pull: { products: { productid: product.productid } } },
                        { new: true }
                      );
                                
                    if(deletepro){
                       return res.status(200).json({message:'Products deleted successfully'})
                    }else{
                       return next(new Error('Unable to delete from the cart', {cause:400}))
                    }
            }
          }

    }
    for (const bundle of bundles) {
      for(let i=0; i<cart.bundles.length; i++){
        if(bundle.bundleid == cart.bundles[i].bundleid){
                const deletebundle = await bundlemodel.findOneAndUpdate(
                    { userid: _id },
                    { $pull: { bundles: { bundleid: bundle.bundleid } } },
                    { new: true }
                  );
                            
                if(deletebundle){
                   return res.status(200).json({message:'Bundles deleted successfully'})
                }else{
                   return next(new Error('Unable to delete from the cart', {cause:400}))
                }
        }
      }

}
}
}

export const getcart= async(req,res,next)=>{
    const {_id}=req.user;
    const cart= await cartmodel.find({userid:_id})
    if(cart){
        return res.status(200).json({message:'success', cart})
    }else{
        return next(new Error('Unable to get your cart', {cause:400}))
    }
}