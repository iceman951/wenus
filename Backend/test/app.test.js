const app = require("../app");
const Post = require("../models/post");
const mongoose = require("mongoose");
const supertest = require("supertest");
const config = require("../config/index");

beforeEach((done) => {
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}), () => done();
});

var token = null;

beforeEach((done) => {
  supertest(app)
    .post('/users/login')
    .send({ email: "peter1@email.com", password: "12345" })
    .end((err, res) => {
      token = res.body.access_token;
      done();
    });
});
 
describe('Post Endpoints', () => {

  test('should create a new post', async () => {
    const res = await supertest(app)
      .post('posts')
      .set('Authorization', 'Bearer ' + token)
      .send({
        email: "peter1@email.com",
        title: '12345'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('post');
  }, 30000);
});