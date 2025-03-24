const app = require("./app");
const config = require("./app/config");

const MongoDB = require("./app/utils/mongodb.util");

const startServer = async () => {
  try {
    await MongoDB.connectDB(config.db.uri);
    console.log("Connected to the database");

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (err) {
    console.error("Error connecting to the database", err);
    process.exit();
  }
};

startServer();
