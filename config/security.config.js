const SECRET = process.env.SECRET || "secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refreshTokenSecret";
const CONNECTION_STRING =
  process.env.CONNECTION_STRING ||
  "connection_string_here";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

// Expiry time is in seconds, defaults to 60000 seconds for access token and 180000 seconds for refresh token
const ACCESS_TOKEN_EXPIRY_TIME =
  parseInt(process.env.ACCESS_TOKEN_EXPIRY_TIME) || 60000;
const REFRESH_TOKEN_EXPIRY_TIME =
  parseInt(process.env.REFRESH_TOKEN_EXPIRY_TIME) || 180000;

module.exports = {
  SECRET,
  REFRESH_TOKEN_SECRET,
  CONNECTION_STRING,
  CLIENT_URL,
  BACKEND_URL,
  ACCESS_TOKEN_EXPIRY_TIME,
  REFRESH_TOKEN_EXPIRY_TIME,
};
