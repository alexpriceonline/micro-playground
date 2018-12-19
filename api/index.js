/**
 * This file is for development purposes only.
 * Each micro function will be deployed as a seperate endpoint
 */
const { send } = require("micro");
const { router, get } = require("micro-fork");

const auth = require("./auth");
const welcome = require("./welcome");

const notfound = (req, res) => send(res, 404, "Not found route");

module.exports = router()(
  get("/api/auth.js", auth),
  get("/api/welcome.js", welcome),
  get("/*", notfound)
);
