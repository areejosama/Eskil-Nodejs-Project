import jwt from 'jsonwebtoken';
import { usermodel } from '../../DB/Models/user.model.js';

export const auth= (accessroles=[])=>{
    return async(req,res,next)=>{
       try{
        const {token}=req.headers;
        if(token.startsWith(process.env.bearerkey)){

            let mytoken= token.split(process.env.bearerkey)[1];
            let decode= await jwt.verify(mytoken, process.env.secretkey);
            let user= await usermodel.findById(decode.id)
            if(!accessroles.includes(user.role)){
                return res.status(403).json({messgae:'You are not autherized user'})
            }else{
                if(user.blockeduser){
                    return res.status(400).json({message:'blocked user'})
                }else{
                    req.user=user;
                    next();
                }
            }
        }else{
            return res.status(400).json({message:'invalid bearer key'})
        }
       }catch(error){
        return res.status(400).json({message:'catch auth error', error})
    }
    }
}