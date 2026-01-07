const express = require('express');
const cors = require('cors');

const requireAuth = require("./middleware/requireAuth");
const requireAdmin = require("./middleware/requireAdmin");

const peopleRoutes = require('./routes/people.routes');
const dogsRoutes = require('./routes/dogs.routes');
const adoptionsRoutes = require('./routes/adoptions.routes');
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

/**
 * USER + ADMIN (każdy zalogowany)
 */
app.use("/api/adoptions", adoptionsRoutes);

/**
 * TYLKO ADMIN
 */
app.use("/api/people", peopleRoutes);
app.use("/api/dogs", dogsRoutes);

module.exports = app;