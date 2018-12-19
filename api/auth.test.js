const micro = require("micro");
const test = require("ava");
const listen = require("test-listen");
const jwt = require("jsonwebtoken");
require("isomorphic-unfetch");

const auth = require("./auth"); // handler

// Start the micro instance and get the url for it
test.before(async t => {
  t.context.service = micro(auth);
  t.context.url = await listen(t.context.service);
});

// Close down the micro instance
test.after(t => {
  t.context.service.close();
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
    body: JSON.stringify({ email: "foo@bar.com", password: "wrong" })
  });
  const json = await res.json(); // get the JSON response

  t.false(json.success);
  t.is(json.msg, "Invalid credenitials");
});

test("Passing correct auth creds results in a login success", async t => {
  const email = "hi@alexpriceonline.com";
  const res = await fetch(t.context.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: "password" })
  });
  const json = await res.json(); // get the JSON response

  t.true(json.success);
  t.is(jwt.decode(json.token).email, email);
});
