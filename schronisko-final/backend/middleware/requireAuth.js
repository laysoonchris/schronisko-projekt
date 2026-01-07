const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../auth.config");

/**
 * Middleware sprawdzający JWT
 * - oczekuje: Authorization: Bearer <token>
 * - po sukcesie: req.user = { id, role, iat, exp }
 */
module.exports = function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};