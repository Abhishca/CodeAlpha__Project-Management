const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/:projectId", async (req, res) => {
  try {
    const tasks = await Task.find({
      projectId: req.params.projectId,
    }).populate("assignedTo", "email"); // ✅ important

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, projectId, assignedTo } = req.body;

    const task = await Task.create({
      title,
      projectId,
      assignedTo, // ✅ new
      status: "todo",
    });

    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Task creation failed" });
  }
});
module.exports = router;