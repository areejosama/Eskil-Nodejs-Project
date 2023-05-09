import {model, Schema, Types} from 'mongoose';

const bundleSchema= new Schema({
    name:{
        type:String, 
        required:[true,'Bundle name is required'],
        min:[3,'min length is 3'],
        max:[30, 'max length is 30'],
        unique:[true, 'Bundle name already exist'],
        trim:true
    },
    createdby:{
       type: Types.ObjectId,
       ref:'user',
       required:[true, 'Bundle owner is required']
    },
    updatedby:{
        type: Types.ObjectId,
        ref:'user',
        required:[true, 'Bundle updater is required']
     },
    image:String,
    imagepublicid:String,
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
      dealexpiredate:Date,
     SKU:{
        type:String,
        unique:true
     },
     totalprice:{
        type:Number,
        default:0
     },
     productsid:[{
        type: Types.ObjectId,
        ref:'product'
    }],
}, {timestamps:true,
   toJSON:{virtuals:true},//to convert data from bson to json
   toObject:{virtuals:true}
});


const bundlemodel= model('bundle', bundleSchema)

export {bundlemodel};