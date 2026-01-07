const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { People } = require("../db/statements");
const requireAuth = require("../middleware/requireAuth");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../auth.config");

const SALT_ROUNDS = 10;

/**
 * POST /api/auth/register
 * body: { first_name, last_name, phone_number, email, password }
 */
router.post("/register", async (req, res) => {
  const { first_name, last_name, phone_number, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const existing = People.getByEmail(email);
  if (existing.length > 0) {
    return res.status(409).json({ error: "User already exists" });
  }

  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

  const result = People.create({
    first_name,
    last_name,
    phone_number,
    email,
    password_hash,
    role: "user",
  });

  res.status(201).json({ id: result.lastInsertRowid });
});


/**
 * POST /api/auth/login
 * body: { email, password }
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const users = People.getByEmail(email);
  if (users.length === 0) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const user = users[0];

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });
});

router.get("/me", requireAuth, (req, res) => {
  const user = People.getById(req.user.id);
  res.json(user);
});

/**
 * POST /api/auth/logout
 * JWT stateless → frontend po prostu usuwa token
 */
router.post("/logout", (req, res) => {
  res.json({ success: true });
});

module.exports = router;