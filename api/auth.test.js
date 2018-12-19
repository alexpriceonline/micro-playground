const micro = require("micro");
const test = require("ava");
const listen = require("test-listen");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const faker = require("faker");
require("isomorphic-unfetch");

const auth = require("./auth"); // auth lambda
const User = require("../lib/models/user"); // user model

// Create fake user data
const email = faker.internet.email();
const password = faker.internet.password();

test.before(async t => {
  // Connect to the local db
  mongoose.connect("mongodb://localhost:27017/testing");

  // Create a user
  await new User({ email, password }).save();

  // Start the micro instance and get the url for it
  t.context.service = micro(auth);
  t.context.url = await listen(t.context.service);
});

test.after(async t => {
  // Close down the micro instance
  t.context.service.close();

  // Remove all users and disconnect on tear down
  await User.deleteMany({});
  mongoose.disconnect();
});

test("Passing no auth creds results in a login failure", async t => {
  const res = await fetch(t.context.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
  const json = await res.json(); // get the JSON response

  t.false(json.success);
  t.is(json.msg, "Invalid credenitials");
});

test("Passing wrong auth creds results in a login failure", async t => {
  const res = await fetch(t.context.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: "wrong" })
  });
  const json = await res.json(); // get the JSON response

  t.false(json.success);
  t.is(json.msg, "Invalid credenitials");
});

test("Passing correct auth creds results in a login success", async t => {
  const res = await fetch(t.context.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const json = await res.json(); // get the JSON response

  t.true(json.success);
  t.is(jwt.decode(json.token).email, email);
});
