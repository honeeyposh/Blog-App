const express=require("express");
const { createUser, getUsers, updateUser } = require("../controllers/userController");
const router=express.Router();
router.post("/createuser",createUser);
// router.post("/login")
 router.get("/loginuser",getUsers)
router.put("/updateuser/:id",updateUser)
// router.delete("deleteuse")
module.exports=router