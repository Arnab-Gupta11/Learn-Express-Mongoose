const Movie = require("../models/movie.model");

const createNewMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllMovies = async (req, res) => {};
const getMovie = async (req, res) => {};
const updateMovie = async (req, res) => {};
const deleteMovie = async (req, res) => {};
module.exports = {
  getAllMovies,
  getMovie,
  createNewMovie,
  updateMovie,
  deleteMovie,
};
