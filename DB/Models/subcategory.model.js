import {model, Schema, Types} from 'mongoose';

const subcategorySchema= new Schema({
    name:{
        type:String, 
        required:[true,'subcategory name is required'],
        min:[3,'min length is 3'],
        max:[15, 'max length is 15'],
        unique:[true, 'subcategory name already exist']
    },
    createdby:{
       type: Types.ObjectId,
       ref:'user',
       required:[true, 'subcategory owner is required']
    },
    updatedby:{
        type: Types.ObjectId,
        ref:'user',
        required:[true, 'subcategory updater is required']
     }, 
    image:String,
    slug:String,
    imagepublicid:String,
    categoryid:{
        type:Types.ObjectId,
        ref:'category'
    }
}, {timestamps:true})

const subcategorymodel= model('subcategory', subcategorySchema);

export {subcategorymodel}