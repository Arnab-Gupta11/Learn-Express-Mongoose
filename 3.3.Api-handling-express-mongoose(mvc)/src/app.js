const express = require("express"); //It will return a function
const morgan = require("morgan");
const moviesRoutes = require("./routes/movies.routes");

const app = express(); //this function will return an object.

// <------- middleware ---------->
//custom middlware funcion
const logger = (req, res, next) => {
  console.log("Custom middleware is called");
  next();
};

app.use(express.json()); //this middleware add the request body to request object
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //morgan middleware logging the information about the request display it in console.
}
app.use(express.static("./public"));
app.use(logger);
app.use((req, res, next) => {
  //accessing req object in custom middlware
  req.requestedAt = new Date().toISOString();
  next();
});
// using routes
app.use("/api/v1/movies", moviesRoutes);

module.exports = app;
