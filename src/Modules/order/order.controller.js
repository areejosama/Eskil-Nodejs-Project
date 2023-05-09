import moment from 'moment';
import { productmodel } from "../../../DB/Models/product.model.js";
import { bundlemodel } from '../../../DB/Models/bundle.model.js';
import { ordermodel } from '../../../DB/Models/order.model.js';

export const createorder= async(req,res,next)=>{
    const {products, bundles,mobile, address }=req.body; 
    let finallestp=[];
    let finallestb=[];
    let sum=0;
    for (const product of products) {
        const foundProduct = await productmodel.findOne({
          _id: { $in : product.productid},
          stock: { $gte: product.quantity }
        }).select('finalprice');

        console.log('checking')
        console.log('product')
        console.log('......')
        console.log(foundProduct)
        if(!foundProduct){
            return next(new Error('invalid product',{cause:400}));
          }else{
            product.totalprice=foundProduct.finalprice * product.quantity
            sum+=product.totalprice;
            finallestp.push(product)
          }
      }

      for (const bundle of bundles) {
        let currentdate= moment();
        const foundbundle = await bundlemodel.findOne({
          _id: { $in : bundle.bundleid},
          stock: { $gte: bundle.quantity }, dealexpiredate:{$gte:currentdate}
        }).select('totalprice');

        console.log('checking')
        console.log('product')
        console.log('......')
        console.log(foundbundle)
        if(!foundbundle){
            return next(new Error('invalid bundle',{cause:400}));
          }else{
            bundle.totalprice=foundbundle.totalprice * bundle.quantity
            sum+=bundle.totalprice;
            finallestb.push(bundle)
          }
      }
    req.body.totalamount=sum;
    req.body.userid=req.user._id;
    req.body.products=finallestp;
    req.body.bundles=finallestb;

    const order= await ordermodel.create(req.body)
    if(order){
        return res.status(200).json({message:'Order Created Successfully', order})
    }else{ 
        return next (new Error('Unable to creat order', {cause:400}))
    }

}

export const vieworderdetails= async(req,res,next)=>{
    const {_id}=req.user;
    const order = await ordermodel.findOne({userid:_id})
    if(order){
        return res.status(200).json({message:'success', order})
    }else{
        return next (new Error('unable to view you order details', {cause:400}))
    }
}

export const updatequantity= async(req,res,next)=>{
    const {orderid}=req.params;
    const order= await ordermodel.findById(orderid)
    
    if(!order){
         return next (new Error('Order not found', {cause:400}))
    }else{
         if(order.orderstatus == 'delivered'){
            const products= order.products;
          async function processprodArray(products) {
            for (const item of products) {
              await getpro(item);
            }
            console.log('Done');
          }
          async function getpro(item) {
            const check= await productmodel.findById(item.productid).select('quantity solditems')
            if(check){
               let newsolditems= check.solditems + item.quantity
                  const QTY= check.quantity - item.quantity
                  const updatedpo=await productmodel.findOneAndUpdate({_id:check._id},{solditems:newsolditems, quantity: QTY, stock:QTY},{new:true}).select('quantity solditems')
                  return res.status(200).json({message:'Product quantity updated', updatedpo})
                }
          }
          processprodArray(products);

          const bundles= order.bundles;
          async function processbundleArray(bundles) {
            for (const item of bundles) {
              await getbundle(item);
            }
            console.log('Done');
          }
          async function getbundle(item) {
            const check= await bundlemodel.findById(item.bundleid).select('quantity solditems')
            if(check){
               let newsolditems= check.solditems + item.quantity
                  const QTY= check.quantity - item.quantity
                  const updatedbundle=await bundlemodel.findOneAndUpdate({_id:check._id},{solditems:newsolditems, quantity: QTY, stock:QTY},{new:true}).select('quantity solditems')
                  return res.status(200).json({message:'Product quantity updated', updatedbundle})
                }
          }
          processbundleArray(bundles);

          }
       
         }
         
}
