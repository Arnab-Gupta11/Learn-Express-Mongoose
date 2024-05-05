const express = require("express");
const { getAllMovies, getMovie, createNewMovie, updateMovie, deleteMovie, checkId } = require("../controllers/movies.controller");

const router = express.Router();

//param middleware
router.param("id", checkId);

router.route("/").get(getAllMovies).post(createNewMovie);
router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

module.exports = router;
