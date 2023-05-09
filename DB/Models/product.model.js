import {model, Schema, Types} from 'mongoose';

const productSchema= new Schema({
    name:{
        type:String, 
        required:[true,'Product name is required'],
        min:[3,'min length is 3'],
        max:[30, 'max length is 30'],
        unique:[true, 'Product name already exist'],
        trim:true
    },
    createdby:{
       type: Types.ObjectId,
       ref:'user',
       required:[true, 'Product owner is required']
    },
    updatedby:{
        type: Types.ObjectId,
        ref:'user',
        required:[true, 'Product updater is required']
     },
    images:[String],
    imagespublicid:[String],
    slug:String,
    description:{
      type:String,
      min:[10, 'min length is 10'],
      max:[1000, 'max length is 1000']
    },
    quantity:{
        type:Number,
        default:0
     },
     solditems:{
        type:Number,
        default:0
     },
     stock:{
        type:Number,
        default:0
     },
     price:{
        type:Number,
        default:0
     },
     discount:{
        type:Number,
        default:0
      },

      discountexpiredate:Date,
     
     finalprice:{
        type:Number,
        default:0
     },
     SKU:{
        type:String, 
        unique:true 
     },
     categoryid:{
        type: Types.ObjectId,
        ref:'category'
     },
     subcategoryid:{
        type: Types.ObjectId,
        ref:'subcategory'
     },
     brandid:{
        type: Types.ObjectId,
        ref:'brand'
     }
}, {timestamps:true,
   toJSON:{virtuals:true},//to convert data from bson to json
   toObject:{virtuals:true}
});

productSchema.virtual("reviews",{
   ref:'review',
   localField:'_id',
   foreignField:'productid'
});

const productmodel= model('product', productSchema)

export {productmodel};