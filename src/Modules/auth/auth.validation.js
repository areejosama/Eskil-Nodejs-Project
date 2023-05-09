import joi from 'joi';


export const signup={
    body:joi.object().required().keys({
       name:joi.string().required().min(3).max(15),
       email:joi.string().email().required(),
       password:joi.string().pattern(new RegExp('^[A-Z][0-9]{3,20}$')).required(),
       cpassword:joi.string().valid(joi.ref('password')).required()
    })
}

export const Verification={
    body:joi.object().required().keys({
        code:joi.string().required().min(4).max(4)
    })
}

export const signin={
    body:joi.object().required().keys({
        email:joi.string().email().required(),
        password:joi.string().pattern(new RegExp('^[A-Z][0-9]{3,20}$')).required()
     }) 
}

export const sendcode={
    body:joi.object().required().keys({
        email:joi.string().email().required()
     }) 
}

export const forgetpassword={
    body:joi.object().required().keys({
        email:joi.string().email().required(),
        code:joi.string().required().min(6).max(6),
        newpassword:joi.string().pattern(new RegExp('^[A-Z][0-9]{3,20}$')).required(),
        cpassword:joi.string().valid(joi.ref('newpassword')).required()
     }) 
}