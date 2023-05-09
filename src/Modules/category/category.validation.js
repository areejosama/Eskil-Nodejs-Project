import joi from 'joi';

export const deletecategory={
    params:joi.object().required().keys({
        categoryid:joi.string().required().min(24).max(24)
     })
}

export const updatecategory={
    params:joi.object().required().keys({
        categoryid:joi.string().required().min(24).max(24)
     })

}