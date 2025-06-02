const express=require("express");
const { createUser, getUsers, updateUser, deleteUser, login } = require("../controllers/userController");
const router=express.Router();
router.post("/createuser",createUser);
router.post("/login",login)
router.get("/getusers",getUsers)
router.put("/updateuser/:id",updateUser)
router.delete("/deleteuser/:id",deleteUser)
module.exports=router