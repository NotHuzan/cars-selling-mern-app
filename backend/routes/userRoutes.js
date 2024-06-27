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
  bookAppointment,
  getBookedAppointment,
  cancelAppointment,
  completeAppointment,
  editAppointment,
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
router.post("/book_appointment", verifyToken, bookAppointment);
router.get("/book_appointment/:userId", verifyToken, getBookedAppointment);
router.delete("/cancel_appointment/:appointmentId", verifyToken, cancelAppointment);
router.delete("/complete_appointment/:appointmentId", verifyToken, completeAppointment);
router.put("/edit_appointment/:appointmentId", verifyToken, editAppointment);

module.exports = router;
