const mongoose = require("mongoose");
const keys = require("../../config/keys");

mongoose.Promise = global.Promise;
mongoose.connect(keys.MONGO_URI, {
  server: {
    auto_reconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  }
});

mongoose.connection
  .once("open", () => console.log(`Connected to ${keys.MONGO_URI}`))
  .on("error", error =>
    console.log(`Error connecting to ${keys.MONGO_URI}`, error)
  );
