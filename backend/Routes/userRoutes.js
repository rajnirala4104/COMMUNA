const express = require("express");
const {
   registieredUser,
   authUser,
   _user,
   get_user,
} = require("../controllers/userController");
const { protect } = require("../middleware/authUser");
const router = express.Router();

router.route("/").post(registieredUser).get(protect, _user);
router.post("/login", authUser);

module.exports = router;
