const jwt = require("jsonwebtoken");
const { errorMessages } = require("../utils/messages");
const {
  SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY_TIME,
  REFRESH_TOKEN_EXPIRY_TIME,
} = require("../config/security.config");
const CustomError = require("../utils/custom-error");

// Authentication middleware for fully authenticated users
const auth = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      SECRET,
      function (err, decode) {
        if (err) {
          next(new CustomError(errorMessages.UNAUTHENTICATED, 401));
        } else {
          user = decode;
          req.user = user;
          next();
        }
      }
    );
  } else {
    next(new CustomError(errorMessages.UNAUTHENTICATED, 401));
  }
};

const roleBasedAuth = (...roles) => {
  return (req, res, next) => {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      jwt.verify(
        req.headers.authorization.split(" ")[1],
        SECRET,
        function (err, decode) {
          if (err) {
            next(new CustomError(errorMessages.UNAUTHENTICATED, 401));
          } else {
            user = decode;
            req.user = user;
            if (!roles.includes(user.role))
              next(
                new CustomError(
                  errorMessages.USER_DOES_NOT_HAVE_ACCESS_PRIVILEGES,
                  403
                )
              );
            else next();
          }
        }
      );
    } else {
      next(new CustomError(errorMessages.UNAUTHENTICATED, 401));
    }
  };
};

// Function for generating JWT tokens
const jwtSign = (user) => {
  delete user.hashedPassword;
  delete user.__v;
  return {
    token: jwt.sign(
      {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY_TIME }
    ),
    refreshToken: jwt.sign(
      {
        _id: user._id,
        isSMSVerified: user.isSMSVerified,
        isEmailVerified: user.isEmailVerified,
        thankYouPageOneCompleted: !!user.thankYouPageOneCompletedAt,
      },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY_TIME }
    ),
  };
};

// Authentication middleware for requesting token
const authRefreshToken = (req, res, next) => {
  jwt.verify(
    req.body.refreshToken,
    REFRESH_TOKEN_SECRET,
    function (err, decode) {
      if (err) {
        next(new CustomError(errorMessages.INVALID_REFRESH_TOKEN, 401));
      } else {
        user = decode;
        req.user = user;
        next();
      }
    }
  );
};

module.exports = {
  auth,
  authRefreshToken,
  jwtSign,
  roleBasedAuth,
};
