const express = require("express");
const UserController = require("../controllers/users.controller");
const router = express.Router();
const {
  auth,
  authRefreshToken,
  roleBasedAuth,
} = require("../middleware/authentication.middleware");

router.get("/", auth, UserController.getUser);

router.post("/signup", UserController.signupUser);

router.post("/login", UserController.loginUser);

router.post("/token/refresh", authRefreshToken, UserController.refreshToken);

router.post("/change-password", auth, UserController.updatePassword);

router.put("/update-profile", auth, UserController.updateUserDetails);

router.post("/send-token", UserController.verifyEmailToken);

router.post("/forgot-password", UserController.resetForgottenPassword);

module.exports = router;
