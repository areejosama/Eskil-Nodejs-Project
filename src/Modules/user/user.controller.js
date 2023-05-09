import { usermodel } from "../../../DB/Models/user.model.js";
import hash from 'bcryptjs';

export const updatepassword= async(req,res,next)=>{
    const {oldpassword, newpassword}= req.body;
    const user= await usermodel.findOne({_id:req.user._id});
    if(user){
        const match= hash.compareSync(oldpassword, user.password);
        if(!match){
            return next(new Error('Invalid Password',{cause:400}))
        }else{
            const hashpass= hash.hashSync(newpassword, parseInt(process.env.saltround))
            const updateuser= await usermodel.findOneAndUpdate({_id:req.user._id},{password:hashpass})
            return res.status(200).json({message:'Password Updated Successfully'})
        }
    }else{
        return next(new Error('Failed To Update The Password',{cause:400}))
    }

}

export const deleteaccount= async(req,res,next)=>{
    const user= await usermodel.findOneAndDelete({_id:req.user._id})
    if(user){
        return res.status(200).json({message:'Account Deleted Successfully'})
    }else{
        return next(new Error('Request Failed', {cause:400}))
    }
}