const micro = require("micro");
const test = require("ava");
const listen = require("test-listen");
const jwt = require("jsonwebtoken");
const faker = require("faker");
require("isomorphic-unfetch");

const { JWT_SECRET } = require("../lib/constants");
const protectedRoute = require("./protected"); // protected lambda

// Create fake user data
const email = faker.internet.email();
const token = jwt.sign({ id: "id", email }, JWT_SECRET, {
  expiresIn: "30 days"
});

test.before(async t => {
  // Start the micro instance and get the url for it
  t.context.service = micro(protectedRoute);
  t.context.url = await listen(t.context.service);
});

test.after(async t => {
  // Close down the micro instance
  t.context.service.close();
});

test("If the protected route is hit without a valid JWT, an error is thrown", async t => {
  const res = await fetch(t.context.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  const txt = await res.text(); // get the TXT response

  t.is(res.status, 401);
});

test("If the protected route is hit with a valid JWT, it should work", async t => {
  const res = await fetch(t.context.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
  const json = await res.json(); // get the JSON response

  t.is(res.status, 200);
  t.is(json.email, email);
});
