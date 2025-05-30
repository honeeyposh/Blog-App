const userModel=require("../models/userModel")
const bcrypt=require("bcryptjs")
exports.createUser=async(req,res,next)=>{
    const{email,password,...others}=req.body
    const userExist=await userModel.findOne({email})
    if(userExist){
        res.send("User alrealdy exist")
    }
    if(!email || !password){
        res.send("Email and password required")
    }
    const salt=bcrypt.genSaltSync(10)
    const hashedPassword=bcrypt.hashSync(password,salt)
    try {
       const user=await userModel.create({email,password:hashedPassword,...others}) 
       res.json({sucess:true,user})
    } catch (error) {
        console.log(error)
    }
}
exports.getUsers=async(req,res,next)=>{
    try{
        const user=await userModel.find()
        res.json({sucess:true,user})
    }catch(error){
        console.log(error)
    }
   
 }
exports.updateUser=async(req,res,next)=>{
    try{
    const{...others}=req.body
    const {id}=req.params
    const user=await userModel.findByIdAndUpdate(id,{...others},{new:true})
    if(!user){
        res.send("User Not found")
    }
    res.json({sucess:true,user})
}catch(error){
    console.log(error)
}
}
exports.deleteUser=async(req,res,next)=>{
    try{
        const {id}=req.params
        const user=await userModel.findByIdAndDelete(id)
        if(!user){
            res.send("User Not Found")
        }
        res.status.json({success:true})
    }catch(error){
        console.log(error)
    }
    
}
 exports.login=async(req,res,next)=>{
    const{email,password}=req.body
    try{
        user=await userModel.findOne({email})
        if(!user){
            res.send("User doesnt exist please Sign in")
        }
        comparePassword=bcrypt.compareSync(password,user.password)
        if(!comparePassword){
            res.send("Please provide a valid password")
        }
        res.json({sucees:true,name:user.name,id:user.id})
    }catch(error){
        console.log(error)
    }
}