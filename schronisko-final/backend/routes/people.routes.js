const express = require("express");
const router = express.Router();
const { People } = require("../db/statements");

// GET /api/people
router.get("/", (req, res) => {
  res.json(People.getAll());
});

// GET /api/people/:id
router.get("/:id", (req, res) => {
  res.json(People.getById(req.params.id));
});

// GET /api/people/email/:email
router.get("/email/:email", (req, res) => {
  res.json(People.getByEmail(req.params.email));
});

// POST /api/people
router.post("/", (req, res) => {
  const result = People.create(req.body);
  res.status(201).json({ id: result.lastInsertRowid });
});

// PUT /api/people/:id
router.put("/:id", (req, res) => {
  People.update(req.params.id, req.body);
  res.json({ success: true });
});

// PUT /api/people/:id/password
router.put("/:id/password", (req, res) => {
  People.updatePassword(req.params.id, req.body.password_hash);
  res.json({ success: true });
});

// DELETE /api/people/:id
router.delete("/:id", (req, res) => {
  People.delete(req.params.id);
  res.json({ success: true });
});

module.exports = router;