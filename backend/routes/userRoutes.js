const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const verifyToken = require("../middleware/auth");
const {
  login,
  signup,
  postAd,
  myAds,
  resetPassword,
  updateProfile,
  getSavedAds,
  saveAd,
  isAdSaved,
  removeSavedAd,
  deleteMyAd,
  editMyAd,
} = require("../controllers/userControllers");

router.post("/login", login);
router.post("/signup", signup);
router.post("/postad", verifyToken, upload.array("images[]"), postAd);
router.get("/myads/:id", verifyToken, myAds);
router.post("/reset_password", verifyToken, resetPassword);
router.put("/update_profile", verifyToken, updateProfile);
router.get("/saved_ads/:userId", verifyToken, getSavedAds);
router.post("/savead", verifyToken, saveAd);
router.post("/is_ad_saved", verifyToken, isAdSaved);
router.delete("/savead", verifyToken, removeSavedAd);
router.delete("/savead", verifyToken, removeSavedAd);
router.delete("/myads/:carId", verifyToken, deleteMyAd);
router.put("/editad/:carId", verifyToken, upload.array("images[]"), editMyAd);

module.exports = router;
