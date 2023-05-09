import {model, Schema, Types} from 'mongoose';

const reviewSchema= new Schema({
    comment:{
        type:String, 
        required:[true,'comment is required'],
    },
    userid:{
       type: Types.ObjectId,
       ref:'user',
       required:[true, 'user is required']
    },
    productid:{
        type: Types.ObjectId,
        ref:'product',
        required:[true, 'product id is required']
    },
    rating:{
        type:Number,
        default:1,
        min:[1,'min = 1'],
        max:[5,'max = 5']
    }
}, {timestamps:true});

const reviewmodel= model('review', reviewSchema)

export {reviewmodel};