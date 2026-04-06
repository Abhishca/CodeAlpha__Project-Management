const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.get("/:taskId", async (req, res) => {
  console.log("👉 GET comments hit"); // DEBUG

  const comments = await Comment.find({
    taskId: req.params.taskId,
  });

  res.json(comments);
});

router.post("/", async (req, res) => {
  console.log("👉 POST comment hit"); // DEBUG

  const comment = await Comment.create(req.body);
  res.json(comment);
});

module.exports = router;