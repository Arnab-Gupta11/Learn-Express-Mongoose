const express = require("express");
const { getAllMovies, getMovie, createNewMovie, updateMovie, deleteMovie } = require("../controllers/movies.controller");

const router = express.Router();

router.route("/").get(getAllMovies).post(createNewMovie);
router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

module.exports = router;
