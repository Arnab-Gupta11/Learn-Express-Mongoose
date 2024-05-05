const fs = require("fs");
const movies = JSON.parse(fs.readFileSync("./public/data/movies.json", "utf-8"));

// <-------- Param Middleware(see notions note) --------->
//In this middleware, there is a value parameter, it will store the value of specific params when called.you can take any name for value.
const checkId = async (req, res, next, value) => {
  const movie = movies.find((el) => {
    return el.id === value * 1;
  });

  //If movie is not found
  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: `Movie with id: ${value} is not found`,
    });
  }
  req.requsetedMovie = movie;
  next();
};

const getAllMovies = async (req, res) => {
  //response send in JSend JSON formate.
  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    count: movies.length, //count is send when there is multiple data in the json.
    data: {
      movies,
    },
  });
};

const createNewMovie = async (req, res) => {
  //req.body contain the data send by user.
  const movie = req.body;
  const newId = movies[movies.length - 1].id + 1;
  //assign method combine 2 object and return a new object.
  const newMovie = Object.assign({ id: newId }, movie);
  movies.push(newMovie);
  fs.writeFile("./public/data/movies.json", JSON.stringify(movies), (err) => {
    //When we create a new resourse then status code will be 201
    res.status(201).json({
      status: "success",
      data: {
        newMovie,
      },
    });
  });
};
const getMovie = async (req, res) => {
  const movie = req.requsetedMovie;
  //If movie found send the movie as response.
  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
};
const updateMovie = async (req, res) => {
  const movieToUpdate = req.requsetedMovie;
  const updatedMovieIndex = movies.indexOf(movieToUpdate);
  Object.assign(movieToUpdate, req.body);
  movies[updatedMovieIndex] = movieToUpdate;
  fs.writeFile("./public/data/movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate,
      },
    });
  });
};
const deleteMovie = async (req, res) => {
  const movieToDelete = req.requsetedMovie;
  const deletedMovieIndex = movies.indexOf(movieToDelete);
  movies.splice(deletedMovieIndex, 1);
  fs.writeFile("./public/data/movies.json", JSON.stringify(movies), (err) => {
    //status code 204 for no content
    res.status(204).json({
      status: "success",
      data: {
        movie: null,
      },
    });
  });
};
module.exports = {
  getAllMovies,
  getMovie,
  createNewMovie,
  updateMovie,
  deleteMovie,
  checkId,
};
