require("dotenv").config({ path: "./config.env" });
const app = require("./app");
const connectToDB = require("./db");

connectToDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on Port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server connection Failed!! ${err.message}`);
  });
