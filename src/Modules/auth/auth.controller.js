import { usermodel } from "../../../DB/Models/user.model.js";
import {sendemail} from '../../Services/email.js';
import hash from 'bcryptjs';
import {nanoid} from 'nanoid';
import jwt from 'jsonwebtoken';

export const signup= async(req,res,next)=>{
  
const {name, email, password}= req.body;

const user = await usermodel.findOne({email})
if(user){
    return next(new Error ("You Already Have an Account",{cause:409}))
}else{
  const hashpass = hash.hashSync(password, parseInt(process.env.saltround))
  const vervicationcode= nanoid(4)
  const emailcontent= `
  <h3> Your Vervication code is 
  </br>
  ${vervicationcode}</h3>
  <h3>Kindly Enter The Code In The Right Field</h3>
  `
  const info= await sendemail(email, 'Account Verification', emailcontent)
  const newuser= new usermodel({name, email, password:hashpass, code:vervicationcode})
  if(info.accepted.length){
   const saveuser= await newuser.save();
   return res.status(200).json({message:'Success',saveuser})
  }else{
    return next(new Error("Rejected Email", {cause:400}))
  }

}
}

export const Verification=async(req,res,next)=>{
    const {code}=req.body;
    if(code==null){
        return next(new Error('Failed!',{cause:400}))
    }else{
        const user= await usermodel.findOneAndUpdate({code},{verifiedaccount:true,code:null})
        if(user){
         return  res.status(200).json({message:'Your Account Is Verified'})
        }else{
            return next(new Error('Check Your Code Again',{cause:400}))
        }
    }
}

export const signin=async (req,res,next)=>{
    const {email, password}=req.body;
    const user= await usermodel.findOne({email})
    if(!user){
        return next(new Error('You Do not Have An Account, Please Signup', {cause:400}))
    }else{
        if(!user.verifiedaccount){
            return next(new Error("Please Verify Your Account", {cause:400}))
        }else{
            if(user.blockeduser){
                return next(new Error("BLOCKED ACCOUNT", {cause:400}))  
            }else{
                const match= await hash.compare(password, user.password)
                if(!match){
                    return next(new Error('Incorrect Password',{cause:400}))
                }else{
                    const token= await jwt.sign({id:user._id}, process.env.secretkey)
                    return res.status(200).json({message:'Success',token})
                }
            }
        }
    }
}

export const sendcode= async(req,res,next)=>{
    const {email}=req.body;
    const user= await usermodel.findOne({email});
    if(user){
        const resetcode= nanoid(6)
        const emailbody= `
        <h3> Your reset password code is 
        </br>
        ${resetcode}</h3>
        <h3>Kindly Enter The Code In The Right Field</h3>
        `
        const info= await sendemail(email, 'Reset Password', emailbody)
        if(info.accepted.length){
            const updateuser= await usermodel.findOneAndUpdate({email},{code:resetcode}, {new:true})
            return res.status(200).json({message:'Code Was Sent To Your Email, Please Check', updateuser})
        }else{
            return next(new Error("Rejected Email", {cause:400}))  
        }
      
    }else{
        return next(new Error('User Not Found'))
    }
}

export const forgetpassword= async(req,res,next)=>{
    const {email, code, newpassword}=req.body;
    if(code==null){
        return next(new Error('Failed',{cause:400}))
    }else{
        const hashpass= hash.hashSync(newpassword, parseInt(process.env.saltround))
        const updateuser= await usermodel.findOneAndUpdate({email, code}, {password:hashpass, code:null}, {new:true})
         res.status(200).json({message:'Success',updateuser})
    }
}

