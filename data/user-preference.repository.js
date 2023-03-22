const UserPreference = require("../models/user-preference");
const CustomError = require("../utils/custom-error");
const { errorMessages } = require("../utils/messages");
const _ = require("lodash");

// A method for getting a user preference instance by Id
exports.get = async (id) => {
  let existingUserPreference = await UserPreference.findOne({ _id: id });
  if (!existingUserPreference)
    throw new CustomError(errorMessages.ACCOUNT_NOT_FOUND, 400);
  return existingUserPreference;
};

// A method for getting a user preference instance by userId
exports.getByUserId = async (userId) => {
  return await UserPreference.findOne({ user: userId });
};

// A method for creating a user preference instance
exports.create = async (newUserPreference) => {
  await newUserPreference.save();
};

// A method for updating user preference instance
exports.update = async (id, updatedUserPreference) => {
  try {
    await UserPreference.findOneAndUpdate({ _id: id }, updatedUserPreference);
  } catch (err) {
    throw err;
  }
};

// A method for deleting one user preference instance
exports.deleteOne = async (id) => {
  try {
    await UserPreference.deleteOne({ _id: id });
  } catch (err) {
    throw err;
  }
};

exports.getAll = async () => {
  try {
    let userPreferences = await UserPreference.find({}).populate(
      "user",
      "fullName email"
    );

    // Filter preferences that don't have a user
    return _.filter(userPreferences, (userPreference) => userPreference.user);
  } catch (err) {
    throw err;
  }
};
