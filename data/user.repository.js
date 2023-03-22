const User = require("../models/user");
const UserPreference = require("../models/user-preference");
const UserPreferenceRepository = require("./user-preference.repository");
const { errorMessages } = require("../utils/messages");
const CustomError = require("../utils/custom-error");

// A method for getting a user instance by Id
exports.get = async (id) => {
  let existingUser = await User.findOne({ _id: id });
  if (!existingUser)
    throw new CustomError(errorMessages.ACCOUNT_NOT_FOUND, 400);
  return existingUser;
};

// A method for getting a user instance by email
exports.getByEmail = async (email) => {
  let existingUser = await User.findOne({ email: email });
  if (!existingUser)
    throw new CustomError(errorMessages.ACCOUNT_NOT_FOUND, 400);
  return existingUser;
};

// A method for getting user instances
exports.getAll = async (pageSize, skip) => {
  return User.find();
};

// A method for getting count of user instances
exports.getCount = async () => {
  return User.count({});
};

// A method for checking  if email is already taken
exports.isEmailTaken = async (email) => {
  return (
    (await User.findOne({
      email: email,
    })) !== null
  );
};

// A method for creating a user instance
exports.create = async (newUser) => {
  await newUser.save().then(async (user) => {
    // Create a new user preference instance every time a new user is created;
    newUserPreference = new UserPreference({
      user: user._id,
      notification: false,
    });

    await newUserPreference.validate();
    await UserPreferenceRepository.create(newUserPreference);
  });
};

// A method for updating user instance
// disableSchema is optional and only to be used for growth signup pages
exports.update = async (id, updatedUser, { disableSchema = false } = {}) => {
  try {
    await User.findOneAndUpdate({ _id: id }, updatedUser, {
      strict: !disableSchema,
    });
  } catch (err) {
    throw err;
  }
};

// A method for deleting one user instance
exports.deleteOne = async (id) => {
  try {
    await User.deleteOne({ _id: id });
  } catch (err) {
    throw err;
  }
};
