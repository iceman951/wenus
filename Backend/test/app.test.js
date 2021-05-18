const app = require("../app");
const Post = require("../models/post");
const mongoose = require("mongoose");
const supertest = require("supertest");
const config = require('./config/index');

beforeEach((done) => {
  mongoose.connect(config.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});