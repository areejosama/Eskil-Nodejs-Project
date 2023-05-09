import {model, Schema, Types} from 'mongoose';

const brandSchema= new Schema({
    name:{
        type:String, 
        required:[true,'brand name is required'],
        min:[3,'min length is 3'],
        max:[10, 'max length is 10'],
        unique:[true, 'brand name already exist']
    },
    createdby:{
       type: Types.ObjectId,
       ref:'user',
       required:[true, 'brand owner is required']
    },
    updatedby:{
        type: Types.ObjectId,
        ref:'user',
        required:[true, 'brand updater is required']
     }, 
    image:String,
    slug:String,
    imagepublicid:String 
}, {timestamps:true});

const brandmodel= model('brand', brandSchema)

export {brandmodel};