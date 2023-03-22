const errorMessages = {
  // When a token has expired or is invalid
  UNAUTHENTICATED: "Please login",

  // When account with a given credential isn't found
  ACCOUNT_NOT_FOUND: "Your account was not found",

  // When a user types an incorrect password
  WRONG_PASSWORD: "Incorrect password",

  // When a user tries to sign up with an already registered email.
  EMAIL_TAKEN: "That email is already registered, try another one",

  // When there's an internal server error
  INTERNAL_SERVER_ERROR: "We are experiencing an internal server error",

  // When refresh token has expired
  INVALID_REFRESH_TOKEN: "Your login session has expired, login again",

  INVALID_TOKEN: "Invalid token",

  // When passwords don't match
  PASSWORDS_DONT_MATCH: "Your passwords do not match",

  // When a user enters an wrong password.
  WRONG_PASSWORD: "Your password is incorrect",
  
  // When a user has not verified the phone
  PHONE_VERIFICATION_REQUIRED: "Please verify your phone number",

  // Phone number is not valid
  PHONE_NUMBER_IS_NOT_VALID: "Phone number is not valid",

  // When a user has not verified the email
  EMAIL_VERIFICATION_REQUIRED: "Please verify your email",

  // When a user tries to verify a verified account
  EMAIL_ALREADY_VERIFIED: "Your email is already verified",

  // When a user doesn't have access privileges
  USER_DOES_NOT_HAVE_ACCESS_PRIVILEGES: "You are not allowed to access this part of the website",

  // When a resource isn't found
  RESOURCE_NOT_FOUND: (event) => `${event} cannot be found`,

  // When a file (for now these are only photos) fails to upload
  FAILED_TO_UPLOAD_FILE: "Your photo failed to upload, try again",

  // When file type (for now these are only photos) is not supported
  FILE_TYPE_NOT_SUPPORTED: "That photo format is not supported, try another format",

  // When file (for now these are only photos) exceeds limit
  FILE_SIZE_EXCEEDS_LIMIT: (limit) =>
    `That photo size exceeds our maximum size of ${limit}, try a smaller photo`,

  // When file (for now these are only photos) is not attached
  ATTACH_FILE: "Please upload a photo",

  // When postmark says it's an invalid email
  INVALID_EMAIL: "That email is valid, please try another one",
};

module.exports = {
  errorMessages,
};
