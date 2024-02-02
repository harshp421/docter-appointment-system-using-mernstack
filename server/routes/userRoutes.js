const express = require("express");
const {
  uploadImages,
  deleteImages,
} = require("../controllers/uploadController");
const { uploadPhoto, docterImgResize } = require("../middlewares/uploadImage");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
  braintreeTokenController,
  braintreePaymentController,
  reviewToDoctar,
  SendEmailToEmail,
  newsLetter,
  updatePassword,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//APply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notifiaction  Doctor || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);
//Notifiaction  Doctor || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);
//get news letter

 router.post("/newsletter", newsLetter);

 router.post("/changepassword",updatePassword)
//router.post("/set-password",   SendEmailToEmail);

//GET ALL DOC
router.get("/getAllDoctors", authMiddleware, getAllDocotrsController);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

//Booking Avliability
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);

//Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);

//brainttre token
router.get("/braintree/token", braintreeTokenController);
//brain payment
router.post("/braintree/payment", authMiddleware, braintreePaymentController);

//Post Review
router.post("/review", authMiddleware, reviewToDoctar);
//POst image
router.post(
  "/uploadimage",
  authMiddleware,
  uploadPhoto.array("images", 10),
  docterImgResize,
  uploadImages
);

router.delete("/delete-img/:id", authMiddleware, deleteImages);

module.exports = router;
