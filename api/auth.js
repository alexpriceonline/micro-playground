const { send, json } = require("micro");
const jwt = require("jsonwebtoken");

const checkUser = require("../lib/helpers/check-user");

const JWT_SECRET = "SECRET";

module.exports = async (req, res) => {
  try {
    const { email, password } = await json(req);

    // Check the user exists and password is correct
    const user = checkUser(email, password);

    // If there is no user, return 401
    if (!user) {
      return send(res, 401, { success: false, msg: "Invalid credenitials" });
    }

    // Create a JWT using the users details
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        fullName: user.firstName + " " + user.lastName
      },
      JWT_SECRET,
      {
        expiresIn: 86400 // expires in 24 hours
      }
    );

    send(res, 200, { success: true, token });
  } catch (err) {
    send(res, 500, { success: false, msg: err });
  }
};
