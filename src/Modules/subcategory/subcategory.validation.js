import joi from 'joi';

export const createsubcategory={
    params:joi.object().required().keys({
        categoryid:joi.string().required().min(24).max(24)
     }) 
}

export const deletesubcategory={
    params:joi.object().required().keys({
        categoryid:joi.string().required().min(24).max(24),
        subcategoryid:joi.string().required().min(24).max(24)
     }) 
}

export const updatesubcategory={
    params:joi.object().required().keys({
        categoryid:joi.string().required().min(24).max(24),
        subcategoryid:joi.string().required().min(24).max(24)
     }) 
}

export const getallsubcats={
    params:joi.object().required().keys({
        categoryid:joi.string().required().min(24).max(24)
     }) 
}