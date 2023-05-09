import { contactmodel } from '../../../DB/Models/contact.model.js';

export const sendmessage= async(req,res,next)=>{
        const {email, message}=req.body;
        const mesg= await contactmodel.create({email, message})
        if(mesg){
            return res.status(200).json({message:'Messgae Sent Successfully'}) 
        }else{
            return next(new Error('Unable to send the message, Please try again',{cause:400}))
        }
    }

export const updatestatus= async(req,res,next)=>{
    const {mesgid}= req.params;
    const mesg= await contactmodel.findById(mesgid);
    if(mesg){
        const updatemesg= await contactmodel.findOneAndUpdate({_id:mesgid}, {status:'Resolved'}, {new:true}).select('-_id status')
        return res.status(200).json({message:'Success',updatemesg})
    }else{
        return next(new Error('Message Not Found',{cause:400}))
    }
}
export const getallmessages= async(req,res,next)=>{
    const mesg= await contactmodel.find({})
    if(mesg){
        return res.status(200).json({message:'Success',mesg})
    }else{
        return next(new Error('Unable to get all messages',{cause:400}))
    }
}

