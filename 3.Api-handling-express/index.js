const express = require("express"); //It will return a function
const fs = require("fs");
const app = express(); //this function will return an object.

//middleware
app.use(express.json()); //this middleware use to send data from client to req.body

// fs.readFileSync return data in Stringfy formate. So convert to object we need to parse it.
const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

//--------> GET : /api/v1/movies <---------
app.get("/api/v1/movies", async (req, res) => {
  //response send in JSend JSON formate.
  res.status(200).json({
    status: "success",
    count: movies.length, //count is send when there is multiple data in the json.
    data: {
      movies,
    },
  });
});

//--------> POST : /api/v1/movies <---------
app.post("/api/v1/movies", async (req, res) => {
  //req.body contain the data send by user.
  const movie = req.body;
  const newId = movies.length + 1;
  //assign method combine 2 object and return a new object.
  const newMovie = Object.assign({ id: newId }, movie);
  movies.push(newMovie);
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    //When we create a new resourse then status code will be 201
    res.status(201).json({
      status: "success",
      data: {
        newMovie,
      },
    });
  });
});

//{--------> GET : /api/v1/movies/:id <---------
app.get("/api/v1/movies/:id", async (req, res) => {
  const { id } = req.params;

  //Using javascript find method searching movie by id.
  const movie = movies.find((el) => {
    return el.id === id * 1; //converting id value string to integer.
  });

  //If movie is not found
  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: `Movie with id: ${id} is not found`,
    });
  }

  //If movie found send the movie as response.
  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
});

//{--------> PATCH : /api/v1/movies/:id <---------
app.patch("/api/v1/movies/:id", async (req, res) => {
  const id = req.params.id;
  //Serching the movie using id
  const movieToUpdate = movies.find((el) => {
    return el.id === id * 1;
  });
  if (!movieToUpdate) {
    return res.status(404).json({
      status: "fail",
      message: `Movie with id: ${id} is not found`,
    });
  }
  const updatedMovieIndex = movies.indexOf(movieToUpdate);
  //When two object have different property then assign method combine both object and return a new object.
  //When two object have some property same then 2nd object value is updated to 1st object.that means 1st object is updated with 2nd object value.we use this here
  Object.assign(movieToUpdate, req.body);

  movies[updatedMovieIndex] = movieToUpdate;

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate,
      },
    });
  });
});

app.delete("/api/v1/movies/:id", async (req, res) => {
  const id = req.params.id;
  //Serching the movie using id
  const movieToDelete = movies.find((el) => {
    return el.id === id * 1;
  });
  if (!movieToDelete) {
    return res.status(404).json({
      status: "fail",
      message: `Movie with id: ${id} is not found for delete`,
    });
  }
  const deletedMovieIndex = movies.indexOf(movieToDelete);
  movies.splice(deletedMovieIndex, 1);
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    //status code 204 for no content
    res.status(204).json({
      status: "success",
      data: {
        movie: null,
      },
    });
  });
});

//--------> Server listen at 5000 port <---------
app.listen(5000, () => {
  console.log(`Server is running at port: 5000`);
});
