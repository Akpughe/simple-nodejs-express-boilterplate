const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  hashedPassword: { type: String, required: true },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

module.exports = UserSchema = mongoose.model("user", UserSchema);
