const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.CONN_STR);
    console.log(`Mongodb Connected !! host : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`Mongodb connection Failed !! Error: ${error.message}`);
  }
};
module.exports = connectToDB;
