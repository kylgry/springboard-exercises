process.env.NODE_ENV = "test"

const request = require("supertest")

const app = require("../app")
let items = require("../fakeDb")

let bottle = { name: "Water Bottle", price: "10.00" }

beforeEach(function() {
  items.push(bottle)
})

afterEach(function() {
  items.length = 0;
})


describe("GET /items", function() {
  test("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([bottle]);
  });
});

describe("GET /items/:name", function() {
  test("Gets a single item", async function() {
    const resp = await request(app).get(`/items/${bottle.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({item: bottle});
  });

  test("Responds with 404 if item not found", async function() {
    const resp = await request(app).get(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});

describe("POST /items", function() {
  test("Creates a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "Table",
        price: "349.99"
      });
    expect(resp.statusCode).toBe(201)
    expect(resp.body).toEqual({ added: { name: "Table", price: "349.99" } })
    expect(items.length).toEqual(2)
  });
});

describe("PATCH /items/:name", function() {
  test("Updates a single item", async function() {
    const resp = await request(app)
      .patch(`/items/${bottle.name}`)
      .send({
        name: "Bottle", price: "19.99"
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ updated: { name: "Bottle", price: "19.99" } })
  });

  test("Responds with 404 if id invalid", async function() {
    const resp = await request(app).patch(`/items/0`)
    expect(resp.statusCode).toBe(404)
  });
});


describe("DELETE /items/:name", function() {
  test("Deletes a single a item", async function() {
    const resp = await request(app).delete(`/items/${bottle.name}`)
    expect(resp.statusCode).toBe(200)
    expect(resp.body).toEqual({ message: "Deleted" })
    expect(items.length).toEqual(0)
  });
});
