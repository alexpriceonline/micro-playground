const test = require("ava");
const mongoose = require("mongoose");

const User = require("./user"); // user model

const password = "password";

// Commect to the local db on setup
test.before(() => mongoose.connect("mongodb://localhost:27017/testing"));

// Remove all users and disconnect on tear down
test.after(async () => {
  await User.deleteMany({});
  mongoose.disconnect();
});

test("Creating a new user hashes the passsword", async t => {
  const _user = new User({ password });
  const user = await _user.save();
  const isMatch = await user.comparePassword(password);

  t.true(isMatch);
});

test("The comparePassword method returns false for incorrect passwords", async t => {
  const _user = new User({ password });
  const user = await _user.save();
  const isMatch = await user.comparePassword("foo");

  t.false(isMatch);
});
