/**
 * This file is for development purposes only.
 * Each micro function will be deployed as a seperate endpoint
 */
const { send } = require("micro");
const { router, options, post, get } = require("micro-fork");

const auth = require("./auth");
const welcome = require("./welcome");
const pro = require("./protected");

const notfound = (req, res) => send(res, 404, "Not found route");

module.exports = router()(
  get("/api/auth.js", auth),
  post("/api/auth.js", auth),
  options("/api/auth.js", auth),
  get("/api/welcome.js", welcome),
  get("/api/protected.js", pro),
  get("/*", notfound)
);
