import {model, Schema, Types} from 'mongoose';

const categorySchema= new Schema({
    name:{
        type:String, 
        required:[true,'category name is required'],
        min:[3,'min length is 3'],
        max:[10, 'max length is 10'],
        unique:[true, 'category name already exist']
    },
    createdby:{
       type: Types.ObjectId,
       ref:'user',
       required:[true, 'category owner is required']
    },
    updatedby:{
        type: Types.ObjectId,
        ref:'user',
        required:[true, 'category updater is required']
     }, 
    image:String,
    slug:String,
    imagepublicid:String,
}, {timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

categorySchema.virtual('subcategories',{
    ref:'subcategory',
    localField:'_id',
    foreignField:'categoryid'
})
const categorymodel= model('category', categorySchema);

export {categorymodel}