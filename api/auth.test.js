const micro = require("micro");
const test = require("ava");
const listen = require("test-listen");
require("isomorphic-unfetch");

const auth = require("./auth");

test("auth endpoint test", async t => {
  const service = micro(auth);
  const url = await listen(service);
  const res = await fetch(url);
  const json = await res.json();

  t.deepEqual(json.success, true);
  service.close();
});
