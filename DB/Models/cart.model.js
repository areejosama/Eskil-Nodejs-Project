import {model, Schema, Types} from 'mongoose';

const cartSchema= new Schema({
     userid:{
        type:Types.ObjectId,
        ref:'user',
        unique:true
     },
     products:[
        {
            productid:{
                type:Types.ObjectId,
                ref:'product'   
            }
        }
     ],
     bundles:[
        {
            bundleid:{
                type:Types.ObjectId,
                ref:'bundle'   
            }
        }
     ]
}, {timestamps:true});

const cartmodel= model('cart', cartSchema)

export {cartmodel};