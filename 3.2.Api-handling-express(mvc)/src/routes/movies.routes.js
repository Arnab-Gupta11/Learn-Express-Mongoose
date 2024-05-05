const express = require("express");
const { getAllMovies, getMovie, createNewMovie, updateMovie, deleteMovie, checkId, validateMovie } = require("../controllers/movies.controller");

const router = express.Router();

//param middleware
router.param("id", checkId);

router.route("/").get(getAllMovies).post(validateMovie, createNewMovie);
router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

module.exports = router;
