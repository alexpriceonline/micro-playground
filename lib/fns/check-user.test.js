const test = require("ava");
const mongoose = require("mongoose");
const faker = require("faker");

const checkUser = require("./check-user");
const User = require("../models/user"); // user model

// Create fake user data
const email = faker.internet.email();
const password = faker.internet.password();

test.before(async t => {
  // Connect to the local db
  mongoose.connect(
    "mongodb://localhost:27017/testing",
    { useNewUrlParser: true }
  );

  // Create a user
  await new User({ email, password }).save();
});

// Remove all users and disconnect on tear down
test.after(async () => {
  await User.deleteMany({});
  mongoose.disconnect();
});

test("The checkUser function should return false if the email is missing", async t => {
  t.false(await checkUser());
});

test("The checkUser function should return false if the password is missing", async t => {
  t.false(await checkUser(email));
});

test("The checkUser function should return false if incorrect credentials are sent", async t => {
  t.false(await checkUser(email, "wrong"));
});

test("The checkUser function should return the user object if correct credentials are sent", async t => {
  const user = await checkUser(email, password);
  t.is(user.email, email);
});
