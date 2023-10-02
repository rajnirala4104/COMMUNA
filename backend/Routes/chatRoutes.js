const express = require("express");
const { protect } = require("../middleware/authUser");
const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);
router.route("/group").get(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
