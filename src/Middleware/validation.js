const methods= ['body', 'params', 'headers', 'file', 'query'];

export const validation= (schema)=>{
    return (req,res,next)=>{
       try{
        let validationerror=[];
        methods.map((method)=>{
            if(schema[method]){
                let validationresults= schema[method].validate(req[method],{abortEarly:false})
                if(validationresults.error){
                    validationerror.push(validationresults.error.details)
                }else{
                    next();
                }
            }
        })
        if(validationerror.length>0){
            res.status(400).json({messgae:'Validation Error', validationerror});
            validationerror=[];
        }
       }catch(error){
        res.status(400).json({message:'catch validation error', error})
       }
    }
}