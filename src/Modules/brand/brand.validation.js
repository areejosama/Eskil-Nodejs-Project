import joi from 'joi';

export const createbrand={
    body:joi.object().required().keys({
        name:joi.string().required().min(3).max(10)
     }) 
}

export const deletebrand={
    params:joi.object().required().keys({
        brandid:joi.string().required().min(24).max(24)
     })  
}

export const updatebrand={
    params:joi.object().required().keys({
        brandid:joi.string().required().min(24).max(24)
     })  
}