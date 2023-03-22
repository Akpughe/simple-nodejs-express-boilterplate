const UserRepository = require("../data/user.repository");
const UserService = require("../services/user.service");
const EmailVerificationService = require("../services/email-verification.service");

exports.getUser = async (req, res, next) => {
  try {
    let user = await UserRepository.get(req.user._id);
    user.hashedPassword = undefined;
    res.json({ user: user });
  } catch (error) {
    next(error);
  }
};

exports.signupUser = async (req, res, next) => {
  try {
    let response = await UserService.register(
      req.body.fullName,
      req.body.email,
      req.body.password,
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    let response = await UserService.login(req.body.email, req.body.password);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    let response = await UserService.refreshToken(req.user._id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    let password = req.body.password;
    const response = await UserService.updatePassword(req.user._id, password);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.updateUserDetails = async (req, res, next) => {
  try {
    const response = await UserService.updateProfile(
      req.user._id,
      req.body.fullName,
      req.body.email,
      req.body.phoneNumber
    );
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.verifyEmailToken = async (req, res, next) => {
  try {
    const response = await EmailVerificationService.sendResetToken(
      req.body.email
    );
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.resetForgottenPassword = async (req, res, next) => {
  try {
    const response = await EmailVerificationService.resetForgotPassword(
      req.body.userId,
      req.body.token,
      req.body.password
    );
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
