const User = require("../models/User");

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