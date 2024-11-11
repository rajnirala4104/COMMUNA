const express = require("express");
const { authUser, searchUserController, userRegistration } = require("../controllers/userController");
const { protect } = require("../middleware/authUser");
const router = express.Router();

router.post("/", userRegistration);
router.get("/", protect, searchUserController);
router.post("/login", authUser);

module.exports = router;
