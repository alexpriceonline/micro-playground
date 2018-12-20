// const { send } = require("micro");
const jwtAuth = require("micro-jwt-auth");

const { JWT_SECRET } = require("../lib/constants");

/**
 * If Authorization Bearer is not present or not valid, return 401
 */
module.exports = jwtAuth(JWT_SECRET)(async (req, res) => {
  return { email: req.jwt.email };
});
