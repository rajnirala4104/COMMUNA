const express = require("express");
const { registieredUser, authUser } = require("../controllers/userController");
const router = express.Router();

router.route("/").post(registieredUser);
router.post("/login", authUser);

module.exports = router;
