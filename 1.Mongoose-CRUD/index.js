const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 5000;

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cliw5jo.mongodb.net/todoDB?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err.message);
  });
//Schema
//A Mongoose schema defines the structure of the document
//default values , validators, etc....
const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, "Minimum 2 letter"],
  },
  ctype: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["fronted", "backend", "database"],
  },
  videos: {
    type: Number,
    // validate(value) {
    //   if (value < 0) {
    //     throw new Error("Video count should not be negative");
    //   }
    // },
    validate: (value) => {
      if (value < 0) {
        throw new Error("Video count should not be negative negative");
      }
    },
  },
  authore: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

//A Mongoose model is a wrapper on the Mongoose schema.
//A Mongoose  model provides an interface to the  database for creating,querying,updating,deleting records etc..

const Playlist = new mongoose.model("Playlist", playlistSchema);

//create  one document
const createDocument = async () => {
  try {
    const reactPlaylist = new Playlist({
      name: "Django",
      ctype: "UI UX",
      videos: -5,
      authore: "Arnab Gupta",
      active: false,
    });
    const reuslt = await reactPlaylist.save();
    console.log(reuslt);
  } catch (err) {
    console.log(err);
  }
};
createDocument();

// Insert multiple Document
const insertMultipleDocument = async () => {
  try {
    const htmlPlaylist = new Playlist({
      name: "HTML",
      ctype: "Front End",
      videos: 50,
      authore: "Arnab Gupta",
      active: true,
    });
    const javascriptPlaylist = new Playlist({
      name: "Javascript",
      ctype: "Front End",
      videos: 30,
      authore: "Arnab Gupta",
      active: true,
    });
    const cssPlaylist = new Playlist({
      name: "CSS",
      ctype: "Front End",
      videos: 50,
      authore: "Arnab Gupta",
      active: true,
    });
    const result = await Playlist.insertMany([htmlPlaylist, javascriptPlaylist, cssPlaylist]);
  } catch (error) {
    console.log(error);
  }
};
// insertMultipleDocument();

//Read Document
const getDocument = async () => {
  try {
    const result = await Playlist.find({ ctype: "Front End" }).select({ name: 1 }).limit(1);
    console.log("🚀 ~ file: index.js:92 ~ getDocument ~ result:", result);
  } catch (error) {
    console.log(error);
  }
};
// getDocument();

// Comparison Query Operators
const getDocumentUsingQuery = async () => {
  try {
    // const result = await Playlist.find({ videos: { $gt: 50 } });
    // const result = await Playlist.find({ videos: { $lte: 50 } });
    // const result = await Playlist.find({ ctype: { $in: ["Back End", "Database"] } });
    const result = await Playlist.find({ ctype: { $nin: ["Back End", "Database"] } });

    console.log("🚀 ~ file: index.js:92 ~ getDocument ~ result:", result);
  } catch (error) {
    console.log(error);
  }
};
// getDocumentUsingQuery();

//Logical  Operator
const getDocumentUsingLogicalOperator = async () => {
  try {
    // const result = await Playlist.find({ $or: [{ ctype: "Front End" }, { name: "CSS" }] });
    // const result = await Playlist.find({ $and: [{ ctype: "Front End" }, { name: "CSS" }] });
    // const result = await Playlist.find({ $nor: [{ ctype: "Front End" }, { name: "CSS" }] });
    const result = await Playlist.find({ ctype: { $not: { $eq: "Front End" } } });
    console.log("🚀 ~ file: index.js:118 ~ getDocumentUsingLogicalOperator ~ result:", result);
  } catch (error) {
    console.log(error);
  }
};
// getDocumentUsingLogicalOperator();

//Count and sort method
const sortAndCount = async () => {
  try {
    // const result = await Playlist.find({ ctype: "Front End" }).select({ name: 1 }).estimatedDocumentCount();
    // const result = await Playlist.find().select({ name: 1 }).sort({ name: 1 });
    const result = await Playlist.find().select({ name: 1 }).sort({ name: -1 });
    console.log("🚀 ~ file: index.js:92 ~ getDocument ~ result:", result);
  } catch (error) {
    console.log(error);
  }
};
// sortAndCount();

//Update document
const updateDocment = async (id) => {
  try {
    const result = await Playlist.findByIdAndUpdate({ _id: id }, { name: "Python" }, { new: true }).select({ name: 1 }).sort({ name: -1 });
    console.log("🚀 ~ file: index.js:92 ~ getDocument ~ result:", result);
  } catch (error) {
    console.log(error);
  }
};

// updateDocment("656a4ce6dfcf7988a528463a");

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
