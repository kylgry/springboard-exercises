// connect to right DB --- set before loading db.js
process.env.NODE_ENV = "test"

// npm packages
const request = require("supertest")

// app imports
const app = require("../app")
const db = require("../db")

let testInvoice

beforeEach(async function() {
  const result = await db.query(
    `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING ID`,
    ['ibm', '19.99', true, '2022-05-20', '2022-05-25'])
    testInvoice = {
    "add_date": "2022-05-20T06:00:00.000Z",
    "amt": 19.99,
    "comp_code": "ibm",
    "id": result.rows[0].id,
    "paid": true,
    "paid_date": "2022-05-25T06:00:00.000Z",
    }

})

afterEach(async function() {
  // delete any data created by test
  await db.query("DELETE FROM invoices");
});

afterAll(async function() {
  // close db connection
  await db.end();
});

describe("GET /invoices", function() {
  test("Gets a list of invoices", async function() {
    const response = await request(app).get(`/invoices`)
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({"invoices": [testInvoice]})
  })
})

describe("GET /invoices/:id", function() {
  test("Get a single ID", async function() {
    const response = await request(app).get(`/invoices/${testInvoice.id}`)
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({invoice: testInvoice})
  });

  test("Responds with 404 if can't find invoice", async function() {
    const response = await request(app).get(`/invoices/9999`)
    expect(response.statusCode).toEqual(404)
  })
})

describe("POST /invoices", function() {
  test("Creates a new invoice", async function() {
    const response = await request(app)
      .post(`/invoices`)
      .send({
        "add_date": "2022-01-01",
        "amt": 999.99,
        "comp_code": "apple",
        "paid": true,
        "paid_date": "2022-01-02"
      })
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      add_date: "2022-01-01T07:00:00.000Z",
      amt: 999.99,
      comp_code: "apple",
      paid: true,
      paid_date: "2022-01-02T07:00:00.000Z"
    })
  })
})

describe("DELETE /invoice/:id", function() {
  test("Deletes a single invoice", async function() {
    const response = await request(app)
      .delete(`/invoices/${testInvoice.id}`)
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ message: "Deleted" })
  })
})

describe("PUT /invoices/:id", function() {
  test("Unpays an invoice", async function() {
    const response = await request(app)
      .put(`/invoices/${testInvoice.id}`)
      .send({
        "amt": 1999.99,
        "paid": false,
      })
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      id: testInvoice.id,
      "add_date": "2022-05-20T06:00:00.000Z",
      "amt": 1999.99,
      "comp_code": "ibm",
      "paid": false,
      "paid_date": null
    })
  })

  test("Responds with 404 if can't find invoice", async function() {
    const response = await request(app).patch(`/invoices/99999`)
    expect(response.statusCode).toEqual(404)
  })
})
