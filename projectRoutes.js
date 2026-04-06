const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createProject, getProjects } = require("../controllers/projectController");
const { inviteUser } = require("../controllers/projectController");

router.post("/", auth, createProject);
router.get("/", auth, getProjects);
router.post("/invite", auth, inviteUser);

module.exports = router;