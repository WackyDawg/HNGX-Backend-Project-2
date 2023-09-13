const request = require('supertest');
const app = require('../index'); // Import your Express app
const mongoose = require('mongoose');
const mongooseMock = require('mongoose-mock');

describe('HNGX Backend Project-2 User CRUD API Tests', () => {
  beforeAll(() => {
    // Mock mongoose.connect to use mongooseMock
    mongoose.connect = mongooseMock.connect;

    // Mock mongoose.disconnect to use mongooseMock
    mongoose.disconnect = mongooseMock.disconnect;
  });

  afterAll(() => {
    // Restore the original functions after all tests
    mongoose.connect = mongooseMock.connect;
    mongoose.disconnect = mongooseMock.disconnect;
  });

  it('should handle user registration', async () => {
    // Perform your API test
    const response = await request(app)
      .post('/api')
      .send({ name: 'Test User 😃' });

    // Assertions
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', 'Test User 😃');
  });

  // Add more test cases for other API endpoints (getUser, updateUser, deleteUser)
});
