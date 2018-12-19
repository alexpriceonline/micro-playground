// const { send } = require("micro");
// const jwtAuth = require("micro-jwt-auth");

/**
 * If Authorization Bearer is not present or not valid, return 401
 */
// module.exports = jwtAuth("my_jwt_secret")(async (req, res) => {
//   return `Hello ${req.jwt.username}!`;
// });
module.exports = async (req, res) => {
  return "Hello";
};
