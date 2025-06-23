const kycModel = require("../models/kycModel");
const userModel = require("../models/userModel");
exports.createKyc = async (req, res) => {
  const payload = req.body;
  const { id } = req.user;
  //   console.log(req.user);
  try {
    const ckeckKycExist = await kycModel.findOne({ user: id });
    if (ckeckKycExist) {
      return res.json({ message: "kyc already exist" });
    }
    const newKyc = await kycModel.create({ user: id, ...payload });
    // console.log(newKyc.id);
    await userModel.findByIdAndUpdate(id, { kyc: newKyc.id }, { new: true });
    return res.send("kyc added succefully");
  } catch (error) {
    res.send(error.message);
  }
};
