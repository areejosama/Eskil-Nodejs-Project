import {model, Schema} from 'mongoose';

const Userschema= new Schema({
    name:{
        type:String,
        required:[true, 'Username is required'],
        min:[3, 'min length is 3'],
        max:[15, 'max length is 15']
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:[true, 'Already you have an account!']
    },
    password:{
        type:String,
        required:[true, 'password is required'],
        min:[8, 'min length is 8'],
        max:[20, 'max length is 20']
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user' 
    },
    verifiedaccount:{
        type:Boolean,
        default:false
    },
    blockeduser:{
        type:Boolean,
        default:false
    },
    code:{
        type:String,
        default:null
    }
},{timestamps:true});

const usermodel= model ('user', Userschema)

export {usermodel}