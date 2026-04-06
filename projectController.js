const Project = require("../models/Project");
const User = require("../models/User");
exports.createProject = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware

    const project = await Project.create({
      title: req.body.title,
      members: [userId], // ✅ add creator
    });

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Project creation failed" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const projects = await Project.find({
      members: userId, // ✅ filter
    }).populate("members", "email");

    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Fetch failed" });
  }
};


exports.inviteUser = async (req, res) => {
  try {
    const { email, projectId } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { members: user._id } }, // no duplicates
      { new: true }
    );

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Invite failed" });
  }
};