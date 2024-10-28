const express = require("express");
const { registieredUser, authUser, searchUserController } = require("../controllers/userController");
const { protect } = require("../middleware/authUser");
const router = express.Router();

router.post("/", registieredUser)
router.get("/", protect, searchUserController);
router.post("/login", authUser);

module.exports = router;
