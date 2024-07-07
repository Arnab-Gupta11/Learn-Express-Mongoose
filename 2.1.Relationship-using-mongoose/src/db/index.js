const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    if (connectionInstance) {
      console.log(`Database Connected successfully!!! connection host: ${connectionInstance.connection.host}`);
    }
  } catch (error) {
    console.log(`Database Connection Failed!!! ${error.message} `);
  }
};
module.exports = connectToDB;
