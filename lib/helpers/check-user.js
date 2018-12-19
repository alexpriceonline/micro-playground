// const User = require("../models/user");

/**
 * Check the users credentials
 */
module.exports = (email, password) => {
  if (!email || !password) {
    return false;
  }

  // For now I'm faking the call to the DB
  const user = {
    _id: "Alex",
    firstName: "Alex",
    lastName: "Price",
    email: "hi@alexpriceonline.com"
  };

  if (email !== user.email) {
    return false;
  }

  return user;

  // return userModel.findOne({ email: email }).then(user => {
  //   if (!user) {
  //     return callback(true, false, { msg: "Incorrect email" });
  //   }

  //   return user.comparePassword(password, (err, isMatch) => {
  //     if (isMatch && !err) {
  //       return callback(false, user, { msg: "Success" });
  //     } else {
  //       return callback(true, false, {
  //         msg: "Authentication failed. Wrong password."
  //       });
  //     }
  //   });
  // });
};
