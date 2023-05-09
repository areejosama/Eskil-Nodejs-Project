import {model, Schema} from 'mongoose';

const contactSchema= new Schema({
    email:{
        type:String, 
        required:[true,'user email is required']
    },
    message:{
        type:String, 
        required:[true,'message is required'],
    },
    status:{
        type:String, 
        default:'Pending',
        enum:['Pending', 'Resolved']
    }
}, {timestamps:true});

const contactmodel= model('contact', contactSchema)

export {contactmodel};