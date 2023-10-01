const express = require("express");
const {
   registieredUser,
   authUser,
   allUsers,
} = require("../controllers/userController");
const protect = require("../middleware/authUser");
const router = express.Router();

router.route("/").post(registieredUser).get(protect, allUsers);
router.post("/login", authUser);

module.exports = router;
