const express = require("express"); //It will return a function
const fs = require("fs");
const app = express(); //this function will return an object.

// fs.readFileSync return data in Stringfy formate. So convert to object we need to parse it.
const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

app.get("/api/v1/movies", async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      movies,
    },
  });
});

app.listen(5000, () => {
  console.log(`Server is running at port: 5000`);
});
