const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../index");

describe("API Tests", () => {
  let createdPersonId;

  // Import necessary modules and setup your app (assuming 'app' is your Express app)


  // Test POST /api to create a new person
  it("POST /api should create a new person", async () => {
    const newPerson = {
      name: "John Doe",
    };

    const res = await request(app).post("/api").send(newPerson);

    console.log("Response:", res.status, res.body);
    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal("Person created successfully🎉");
    expect(res.body.newPerson).to.have.property("_id");
    createdPersonId = res.body.newPerson._id;
  });

  // Test POST /api to create a new person with existing name
  it("POST /api should create a new person with existing name", async () => {
    const existingPerson = {
      name: "John Doe",
    };

    const res = await request(app).post("/api").send(existingPerson);

    console.log("Response:", res.status, res.body);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal(
      'Person with name "John Doe" already exists'
    );
    //createdPersonId = res.body.newPerson._id;
  });

  // Test POST /api to create a new person with Invalid Name type
  it("POST /api should create a new person with Invalid Name type", async () => {
    const invalidPerson = {
      name: "John Doe2",
    };

    const res = await request(app).post("/api").send(invalidPerson);
    console.log("Response:", res.status, res.body);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("Name must be a string");
    //createdPersonId = res.body.newPerson._id;
  });

  // Test GET /api/:userID to retrieve the created person
  it("GET /api/:userID should retrieve the created person", async () => {
    const res = await request(app).get(`/api/${createdPersonId}`);
    console.log("Response:", res.status, res.body);
    expect(res.status).to.equal(200);
    expect(res.body.person).to.have.property("_id");
    expect(res.body.person.name).to.equal("John Doe");
  });

  // Test PUT /api/:userID to update the created person
  it("PUT /api/:userID should update the created person", async () => {
    const updatedPerson = {
      name: "Jane Smith",
    };

    const res = await request(app)
      .put(`/api/${createdPersonId}`)
      .send(updatedPerson);

    console.log("Response:", res.status, res.body);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Person updated successfully");

    // Verify that the person's name has been updated
    const getRes = await request(app).get(`/api/${createdPersonId}`);
    console.log("Response:", res.status, res.body);
    expect(getRes.status).to.equal(200);
    expect(getRes.body.person.name).to.equal("Jane Smith");
  });

  // Test DELETE /api/:userID to delete the created person
  it("DELETE /api/:userID should delete the created person", async () => {
    const res = await request(app).delete(`/api/${createdPersonId}`);
    console.log("Response:", res.status, res.body);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Person deleted successfully🗑️");

    // Verify that the person has been deleted
    const getRes = await request(app).get(`/api/${createdPersonId}`);
    console.log("Response:", res.status, res.body);
    expect(getRes.status).to.equal(404);
    expect(getRes.body.message).to.equal("Person not found");
  });
});
