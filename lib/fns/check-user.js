const mongoose = require("mongoose");

const User = require("../models/user");

const connectToDB = () => {
  if (process.env.NODE_ENV !== "test") {
    console.log("Connecting to db....");
    mongoose.connect(
      "mongodb://localhost:27017/prod",
      { useNewUrlParser: true }
    );
    return mongoose.disconnect;
  }
  return () => {};
};

// Check the users credentials
module.exports = async (email, password) => {
  if (!email || !password) {
    return false;
  }

  const disconnect = connectToDB();
  const user = await User.findOne({ email });
  disconnect();

  if (!user) {
    return false;
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return false;
  }

  return user;
};
