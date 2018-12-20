const test = require("ava");
const mongoose = require("mongoose");
const faker = require("faker");

const User = require("./user"); // user model

// Create fake user data
const password = faker.internet.password();

// Connect to the local db on setup
test.before(() =>
  mongoose.connect(
    "mongodb://localhost:27017/testing",
    { useNewUrlParser: true }
  )
);

// Remove all users and disconnect on tear down
test.after(async () => {
  await User.deleteMany({});
  mongoose.disconnect();
});

test("Creating a new user hashes the passsword", async t => {
  const user = await new User({ password }).save();
  const isMatch = await user.comparePassword(password);

  t.true(isMatch);
});

test("The comparePassword method returns false for incorrect passwords", async t => {
  const user = await new User({ password }).save();
  const isMatch = await user.comparePassword("foo");

  t.false(isMatch);
});
