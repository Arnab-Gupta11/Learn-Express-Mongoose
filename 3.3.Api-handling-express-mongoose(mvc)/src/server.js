const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const connectToDB = require("./db");
const { default: mongoose } = require("mongoose");
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

//Schema based model: we create model based on schema and using that model we can crete document, querying on that document.
//1.Create Schema: like bluprint of your collection.
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Movie name is required"],
    uniqe: true,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
  },
  rating: {
    type: Number,
    default: 1.0,
  },
});
//2. Create a model based on this schema so that we can manipulate collection.
// const model-name = mongoose.model("collection-name", schema-name);
//model-nmae => By using this model name we manipulate the collection in our server.
//collection-name: we write the collection-name as singular form, by default mongodb create a collection in plural name.
const movie = mongoose.model("Movie", movieSchema);

//when we start server by default node initialize many variable that we can use anywhere.that is environment variable.(see notion note)
// console.log(process.env); //It will show all the variable set in process.env
// console.log(app.get("env")); //node js by default set to development.
