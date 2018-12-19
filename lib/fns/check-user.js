const User = require("../models/user");

// Check the users credentials
module.exports = async (email, password) => {
  if (!email || !password) {
    return false;
  }

  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return false;
  }

  return user;
};
