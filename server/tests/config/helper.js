const mongoose = require("mongoose");
const keys = require("../../config/keys");

const { ObjectId } = mongoose.Types;

process.env.NODE_ENV = "test";

const config = {
  db: {
    test: keys.MONGO_URI
  },
  connection: null
};

function connect() {
  return new Promise((resolve, reject) => {
    if (config.connection) {
      return resolve();
    }
    mongoose.Promise = global.Promise;

    const options = {
      server: {
        auto_reconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
      }
    };

    mongoose.connect(keys.MONGO_URI, options);

    mongoose.connection
      .once("open", () => console.log(`Connected to ${keys.MONGO_URI}`))
      .on("error", error =>
        console.log(`Error connecting to ${keys.MONGO_URI}`, error)
      );
  });
}

function clearDatabase() {
  return new Promise(resolve => {
    let count = 0;
    let max = Object.keys(mongoose.connection.collections).length;
    for (const i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {
        count++;
        if (count >= max) {
          resolve();
        }
      });
    }
  });
}

export async function setupTest() {
  await connect();
  await clearDatabase();
}

// have to finish getContext function
export function getContext() {}
