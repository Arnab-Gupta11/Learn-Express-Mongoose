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
    res.status(201).json({
      status: "success",
      data: {
        newMovie,
      },
    });
  });
});

//{--------> GET : /api/v1/movies/:id <---------
//<------- Route parameter -------->
//Here id is a Route parameter => Route parameter are named URL segments that are used to capture the values spesified at their position in the URL
// api/v1/movies/:id  => /api/v1/movies/4  => id=4
//All the route parameter are stored as the property of the params object.And the params is property of the req object.

//<------- Multiple route parameter -------->
// => /api/v1/movies/:id/:name => /api/v1/movies/5/Arnab
//we get the response as {id:"5",name:"Arnab"}
//Here we can see that we passed the id as integer but it stored as string. So if we use it as a integer, we should parse it from string to integer.}

//<-------- Optional route parameter -------->

app.get("/api/v1/movies/:id", async (req, res) => {});

//--------> Server listen at 5000 port <---------
app.listen(5000, () => {
  console.log(`Server is running at port: 5000`);
});
