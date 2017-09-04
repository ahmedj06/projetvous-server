"use strict";

module.exports = {
  app: {
    hostname: "127.0.0.1",
    baseUrl: "http://localhost:3000",
    port: 3000,
    name: "Express API server"
  },
  db: {
    dialect: "mongodb",
    dbname: "projetvous",
    host: "localhost",
    port: 27017,
    username: "",
    password: "",
    url: "mongodb://localhost:27017/projetvous"
  },
  serveStatic: false,
  jwt: {                        
    secret: "someVeRyN1c3S#cr3tHer34U",
    algorithm: "RS256",
    session: false
  }
};
