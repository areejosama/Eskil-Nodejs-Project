import mongoose from "mongoose"

const connectiondb = async()=>{
    return await mongoose.connect(process.env.dbconnection)
    .then((result)=>{
        console.log('connected successfully')
    })
    .catch((err)=>{
       console.log(`connection failed ${err}`)
    })
}

export default connectiondb;