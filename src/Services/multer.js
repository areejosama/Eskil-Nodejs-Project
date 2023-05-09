import multer from 'multer';

export const filevalidation={
    image:['image/png','image/jpeg']
}

export function mymulter(filevalidation){

    const storage = multer.diskStorage({})
    function fileFilter (req, file, cb) {

        if(filevalidation.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb("invalid file type", false)
        }
      
      }  
    const upload = multer({fileFilter, storage })
    return upload;
}

export const HME = (error,req,res,next)=>{
    if(error){
        res.status(400).json({message:'multer error',error})
    }else{
        next();
    }
}