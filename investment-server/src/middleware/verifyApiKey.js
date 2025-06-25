import config from "../config/index.js";

const API_KEY = config.api_key;

// Middleware to validate API key
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  //   console.log(apiKey);
  if (apiKey !== API_KEY) {
    return res.status(403).send("Forbidden");
  }
  next();
};

export default verifyApiKey;
