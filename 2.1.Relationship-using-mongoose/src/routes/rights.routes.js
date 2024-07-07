const express = require("express");
const { createRights, fetchAllRights, getSingleRights } = require("../controllers/rights.controller");
const router = express.Router();
router.route("/").post(createRights).get(fetchAllRights);
router.route("/:id").get(getSingleRights);

module.exports = router;
