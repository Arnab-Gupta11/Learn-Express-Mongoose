//Schema based model: we create model based on schema and using that model we can crete document, querying on that document.

const { default: mongoose } = require("mongoose");

//1.Create Schema: like bluprint of your collection.
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Movie name is required"],
    unique: [true, "Movie name should be unique"],
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
//model-nmae => By using this model name we manipulate the collection in our server. [Note: Convention is model name start with a capital later]
//collection-name: we write the collection-name as singular form, by default mongodb create a collection in plural name.
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
