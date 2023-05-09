import {model, Schema, Types} from 'mongoose';

const orderSchema= new Schema({
     userid:{
        type:Types.ObjectId,
        ref:'user',
     },
     products:[
        {
            productid:{
                type:Types.ObjectId,
                ref:'product'   
            },
            quantity:{
                type:Number,
                default:1
            },
            totalprice:{
               type:Number,
               default:1
            }
        }
     ],
     bundles:[
        {
            bundleid:{
                type:Types.ObjectId,
                ref:'bundle'   
            },
            quantity:{
                type:Number,
                default:1
            },
            totalprice:{
               type:Number,
               default:1
            }
        }
     ],
     address:String,
     mobile:String,
     totalamount:Number,
     orderstatus:{
        type:String,
        default:'pending',
        enum:['pending', 'confirmed', 'delivered', 'cancelled']
     },
     paymentmethod:{
        type:String,
        default:'cash',
        enum:['cash','card']
     }
}, {timestamps:true});

const ordermodel= model('order', orderSchema)

export {ordermodel};