const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve a simple health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Serve emergencies list from data file
app.get("/api/emergencies", (req, res) => {
  const file = path.join(__dirname, "data", "emergencies.json");
  fs.readFile(file, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "failed to read data" });
    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (e) {
      res.status(500).json({ error: "invalid json" });
    }
  });
});

// Single emergency by id or slug
app.get("/api/emergencies/:id", (req, res) => {
  const id = req.params.id;
  const file = path.join(__dirname, "data", "emergencies.json");
  fs.readFile(file, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "failed to read data" });
    try {
      const json = JSON.parse(data);
      const found = json.find((e) => e.id === id || e.slug === id);
      if (!found) return res.status(404).json({ error: "not found" });
      res.json(found);
    } catch (e) {
      res.status(500).json({ error: "invalid json" });
    }
  });
});

// Create a new emergency (POST)
app.post("/api/emergencies", (req, res) => {
  const payload = req.body || {};
  const file = path.join(__dirname, "data", "emergencies.json");

  // basic validation
  if (!payload.title || !payload.steps || !Array.isArray(payload.steps)) {
    return res.status(400).json({ error: "title and steps[] are required" });
  }

  fs.readFile(file, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "failed to read data" });
    try {
      const json = JSON.parse(data);

      // generate slug from title if not provided
      const slugFromTitle = (s) =>
        s
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      let id = payload.id || slugFromTitle(payload.title);

      // ensure unique id
      if (json.some((e) => e.id === id || e.slug === id)) {
        id = `${id}-${Date.now()}`;
      }

      const newItem = {
        id,
        slug: payload.slug || id,
        title: payload.title,
        tags: payload.tags || [],
        description: payload.description || "",
        cta: payload.cta || null,
        steps: payload.steps || [],
      };

      json.push(newItem);

      fs.writeFile(file, JSON.stringify(json, null, 2), "utf8", (err) => {
        if (err) return res.status(500).json({ error: "failed to write data" });
        res.status(201).json(newItem);
      });
    } catch (e) {
      res.status(500).json({ error: "invalid json" });
    }
  });
});

// Update an existing emergency (PUT)
app.put("/api/emergencies/:id", (req, res) => {
  const id = req.params.id;
  const payload = req.body || {};
  const file = path.join(__dirname, "data", "emergencies.json");

  fs.readFile(file, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "failed to read data" });
    try {
      const json = JSON.parse(data);
      const idx = json.findIndex((e) => e.id === id || e.slug === id);
      if (idx === -1) return res.status(404).json({ error: "not found" });

      const updated = Object.assign({}, json[idx], payload);
      // keep id/slug consistent unless explicitly provided
      updated.id = payload.id || json[idx].id;
      updated.slug = payload.slug || json[idx].slug;

      json[idx] = updated;

      fs.writeFile(file, JSON.stringify(json, null, 2), "utf8", (err) => {
        if (err) return res.status(500).json({ error: "failed to write data" });
        res.json(updated);
      });
    } catch (e) {
      res.status(500).json({ error: "invalid json" });
    }
  });
});

// Delete an emergency
app.delete("/api/emergencies/:id", (req, res) => {
  const id = req.params.id;
  const file = path.join(__dirname, "data", "emergencies.json");

  fs.readFile(file, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "failed to read data" });
    try {
      const json = JSON.parse(data);
      const idx = json.findIndex((e) => e.id === id || e.slug === id);
      if (idx === -1) return res.status(404).json({ error: "not found" });
      const removed = json.splice(idx, 1)[0];

      fs.writeFile(file, JSON.stringify(json, null, 2), "utf8", (err) => {
        if (err) return res.status(500).json({ error: "failed to write data" });
        res.json({ deleted: removed });
      });
    } catch (e) {
      res.status(500).json({ error: "invalid json" });
    }
  });
});

app.listen(port, () => {
  console.log(`first-aid-backend listening on http://localhost:${port}`);
});
