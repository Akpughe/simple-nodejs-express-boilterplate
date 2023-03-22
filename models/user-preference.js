const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserPreferenceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  notification: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = UserPreferenceSchema = mongoose.model(
  "userpreference",
  UserPreferenceSchema
);
