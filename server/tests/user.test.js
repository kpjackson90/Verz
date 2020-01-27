const app = require('../server.js');
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const supertest = require('supertest');
const request = supertest(app);
const {graphql} = require('graphql');
const schema = require('../../server/schema/schema');
const User = mongoose.model('User', new mongoose.Schema({name: String}));

//jest.setTimeout(600000);

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoURI = await mongoServer.getUri();
  await mongoose.connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
    err => {
      if (err) console.error(err);
    }
  );
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('this is a test test', () => {
  it('test endpoint', async () => {
    const query = `
    {
      user{
          id,
          email,
          followers{
              email
          },
          following{
              id,
              email,
              posts{
                  title,
                  body
              }
              
          }
      }
  }
    `;
    const res = await request.post('/graphql').send({query});

    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors[0]).toHaveProperty(
      'message',
      'Authentication is needed to get requested response.'
    );
    expect(res.body.errors[0]).toHaveProperty('statusCode', 401);
    expect(res.body.data).toHaveProperty('user', null);
  });
});
