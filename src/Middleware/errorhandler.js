export const asynchandler= (fn)=>{
   return (req,res,next)=>{
     fn(req,res,next).catch(error=>{
        console.log(error)
        return next(new Error( error,{cause:500}))
     })
   }
}