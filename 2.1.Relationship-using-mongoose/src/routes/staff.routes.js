const express = require("express");
const { createStaff } = require("../controllers/staff.controller");
const router = express.Router();

router.route("/").post(createStaff);

module.exports = router;
