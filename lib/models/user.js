const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String }
});

// Hash the users password before saving the document
UserSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

// Compare the plaintext password with the the hash
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

mongoose.model("User", UserSchema);

module.exports = mongoose.model("User");
