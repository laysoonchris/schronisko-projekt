const express = require("express");
const router = express.Router();
const { Adoptions } = require("../db/statements");

// GET /api/adoptions
router.get("/", (req, res) => {
  res.json(Adoptions.getAll());
});

// GET /api/adoptions/free
router.get("/free/list", (req, res) => {
  res.json(Adoptions.getFreeDogs());
});

<<<<<<< Updated upstream
=======
// PUT /api/adoptions/:id/status
router.put("/:id/status", (req, res) => {
  const { status } = req.body;

  if (!["wolny", "w trakcie", "zaadoptowany"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  Adoptions.updateStatus(req.params.id, status);
  res.json({ success: true });
});

// GET /api/adoptions/dog/:dogId
router.get("/dog/:dogId", (req, res) => {
  res.json(Adoptions.getByDogId(req.params.dogId));
});

>>>>>>> Stashed changes
// GET /api/adoptions/person/:personId
router.get("/person/:personId", (req, res) => {
  res.json(Adoptions.getByPersonId(req.params.personId));
});

// GET /api/adoptions/dog/:dogId
router.get("/dog/:dogId", (req, res) => {
  res.json(Adoptions.getByDogId(req.params.dogId));
});

// GET /api/adoptions/:id
router.get("/:id", (req, res) => {
  res.json(Adoptions.getById(req.params.id));
});

// PUT /api/adoptions/:id/status
router.put("/:id/status", (req, res) => {
  const { status } = req.body;

  if (!["wolny", "w trakcie", "zaadoptowany"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  Adoptions.updateStatus(req.params.id, status);
  res.json({ success: true });
});

// POST /api/adoptions (ADOPCJA)
router.post("/", (req, res) => {
  const { person_id, dog_id, description } = req.body;

  try {
    Adoptions.adoptDog(person_id, dog_id, description);
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/adoptions/return/:dogId
router.put("/return/:dogId", (req, res) => {
  Adoptions.returnDog(req.params.dogId);
  res.json({ success: true });
});

// PUT /api/adoptions/change-owner/:dogId
router.put("/change-owner/:dogId", (req, res) => {
  const { person_id } = req.body;
  Adoptions.changeOwner(req.params.dogId, person_id);
  res.json({ success: true });
});

// DELETE /api/adoptions/:id
router.delete("/:id", (req, res) => {
  Adoptions.delete(req.params.id);
  res.json({ success: true });
});

module.exports = router;