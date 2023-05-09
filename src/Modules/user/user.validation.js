import joi from 'joi';

export const updatepassword={
    body:joi.object().required().keys({
        oldpassword:joi.string().pattern(new RegExp('^[A-Z][0-9]{3,20}$')).required(),
        newpassword:joi.string().pattern(new RegExp('^[A-Z][0-9]{3,20}$')).required(),
        cpassword:joi.string().valid(joi.ref('newpassword')).required()
     }) 
}