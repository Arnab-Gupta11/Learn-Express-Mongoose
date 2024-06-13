const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const connectToDB = require("./db");
const port = process.env.PORT || 3000;

//Connect server to database
connectToDB()
  .then(() => {
    //--------> Server listen at 5000 port <---------
    app.listen(port, () => {
      console.log(`⚙️ Server is running at port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!! ", err);
  });

//when we start server by default node initialize many variable that we can use anywhere.that is environment variable.(see notion note)
// console.log(process.env); //It will show all the variable set in process.env
// console.log(app.get("env")); //node js by default set to development.
