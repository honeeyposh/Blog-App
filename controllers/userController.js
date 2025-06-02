const userModel=require("../models/userModel")
const bcrypt=require("bcryptjs")
exports.createUser=async(req,res,next)=>{
    const{email,password,...others}=req.body
    const userExist=await userModel.findOne({email})
    if(userExist){
        return res.send("User alrealdy exist")
    }
    if(!email || !password){
        return res.send("Email and password required")
    }
    const salt=bcrypt.genSaltSync(10)
    const hashedPassword=bcrypt.hashSync(password,salt)
    try {
       const user=await userModel.create({email,password:hashedPassword,...others}) 
       return res.json({sucess:true,user})
    } catch (error) {
        res.send(error.message)
    }
}
exports.getUsers=async(req,res,next)=>{
    try{
        const user=await userModel.find()
       return res.json({sucess:true,user})
    }catch(error){
       return res.send(error.message)
    }
   
 }
exports.updateUser=async(req,res,next)=>{
    try{
    const{...others}=req.body
    const {id}=req.params
    const user=await userModel.findByIdAndUpdate(id,{...others},{new:true})
    if(!user){
        return res.send("User Not found")
    }
   return res.json({sucess:true,user})
}catch(error){
    return res.send(error.message)
}
}
exports.deleteUser=async(req,res,next)=>{
    try{
        const {id}=req.params
        // console.log(id)
        const user=await userModel.findByIdAndDelete(id)
        // console.log(user)
        if(!user){
            return res.send("User Not Found")
        }
        res.json({success:true})
    }catch(error){
        return res.send(error.message)
    }
    
}
 exports.login=async(req,res,next)=>{
    const{email,password}=req.body
    try{
        user=await userModel.findOne({email})
        if(!user){
           return res.send("User doesnt exist please Sign up")
        }
        comparePassword=bcrypt.compareSync(password,user.password)
        if(!comparePassword){
           return res.send("Please provide a valid password")
        }
       return res.json({sucees:true,name:user.name,id:user.id})
    }catch(error){
        return res.send(error.message)
    }
}