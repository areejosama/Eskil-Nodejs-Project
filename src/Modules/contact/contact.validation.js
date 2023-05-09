import joi from 'joi';

export const updatestatus={
    params:joi.object().required().keys({
        mesgid:joi.string().required().min(24).max(24)
     })  
}