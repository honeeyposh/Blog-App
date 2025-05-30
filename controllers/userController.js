const userModel=require("../models/userModel")
exports.createUser=async(req,res,next)=>{
    const{email,password,...others}=req.body
    const userExist=await userModel.findOne({email})
    if(userExist){
        res.send("User alrealdy exist")
    }
    if(!email || !password){
        res.send("Email and password required")
    }
    try {
       const user=await userModel.create({email,password,others}) 
       res.json({sucess:true,user})
    } catch (error) {
        console.log(error)
    }
}
exports.getUsers=async(req,res,next)=>{
    const user=await userModel.find()
    res.json({sucess:true,user})
 }
exports.updateUser=async(req,res,next)=>{
    const{...others}=req.body
    const id=req.params.id
    const user=await userModel.findByIdAndUpdate(id,{...others},{new:true})
    if(!user){
        res.send("User Not found")
    }
    res.status.json({sucess:true,user})
}
exports.deleteUser=async(req,res,next)=>{
    const {id}=req.params.id
    const user=await userModel.findByIdAndDelete(id)
    if(!user){
        res.send("User Not FOund")
    }
    res.status.json({success:true})
}