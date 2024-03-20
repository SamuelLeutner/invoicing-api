const userRepository = require("../../Domain/Users/Repositories/UserRepository");

const userInstanceRepository = new userRepository();

async function authenticate(req, res, next) {
  try {
    const apiToken = req.query.api_token ||
      (req.headers["authorization"] &&
        req.headers["authorization"].split(" ")[1]);

    if (!apiToken) {
      return res.status(401).json({ error: "Authorization token missing." });
    }
    const user = await userInstanceRepository.findApiToken(res, apiToken);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized access. Please login again" });
    }

    req.user = user._id;
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).send({
      error: "Internal server error.",
    });
  }
}
module.exports = { authenticate };
