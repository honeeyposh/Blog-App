const express = require("express");
const { createKyc } = require("../controllers/kycController");
const authentication = require("../middlewares/authMiddleware");
const route = express.Router();
route.post("/kyc", authentication, createKyc);
module.exports = route;
