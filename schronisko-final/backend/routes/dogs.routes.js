const express = require("express");
const router = express.Router();
const { Dogs, Adoptions } = require("../db/statements");

// GET /api/dogs
router.get("/", (req, res) => {
  res.json(Dogs.getAll());
});

// GET /api/dogs/free
router.get("/free", (req, res) => {
  res.json(Adoptions.getFreeDogs());
});

// GET /api/dogs/:id
router.get("/:id", (req, res) => {
  res.json(Dogs.getById(req.params.id));
});

// POST /api/dogs
router.post("/", (req, res) => {
  const result = Dogs.create(req.body);
  res.status(201).json({ id: result.lastInsertRowid });
});

// PUT /api/dogs/:id
router.put("/:id", (req, res) => {
  Dogs.update(req.params.id, req.body);
  res.json({ success: true });
});

// DELETE /api/dogs/:id
router.delete("/:id", (req, res) => {
  Dogs.delete(req.params.id);
  res.json({ success: true });
});

module.exports = router;