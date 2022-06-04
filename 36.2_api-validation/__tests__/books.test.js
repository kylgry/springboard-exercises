// connect to right DB --- set before loading db.js
process.env.NODE_ENV = "test"

// npm packages
const request = require("supertest")

// app imports
const app = require("../app")
const db = require("../db")
const Book = require("../models/book")

const book1 = {
  "isbn": "9780143039884",
  "amazon_url": "https://www.amazon.com/Eichmann-Jerusalem-Banality-Penguin-Classics/dp/0143039881",
  "author": "Hannah Arendt",
  "language": "english",
  "pages": 312,
  "publisher": "Viking Press",
  "title": "Eichmann in Jerusalem: A Report on the Banality of Evil",
  "year": 1963
}

const book2 = {
  "isbn": "0691161518",
  "amazon_url": "http://a.co/eobPtX2",
  "author": "Matthew Lane",
  "language": "english",
  "pages": 300,
  "publisher": "Princeton University Press",
  "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
  "year": 2019
}

const bookInvalid = {
  "isbn": "0691161518",
  "amazon_url": "http://a.co/eobPtX2",
  "author": "Matthew Lane",
  "language": "english",
  "pages": "300",
  "publisher": "Princeton University Press",
  "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
  "year": 2019
}



beforeEach(async function() {
  const book3 = {
      "isbn": "0691161518",
      "amazon_url": "http://a.co/eobPtX2",
      "author": "Matthew Lane",
      "language": "english",
      "pages": 264,
      "publisher": "Princeton University Press",
      "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      "year": 2017
  }
  const result = await Book.create(book3)
})

afterEach(async function() {
  // delete any data created by test
  await db.query("DELETE FROM books");
})

afterAll(async function() {
  // close db connection
  await db.end()
})

describe("POST /books", function() {
  test("Creates a new book", async function() {
    const response = await request(app)
      .post(`/books`)
      .send(bookInvalid)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual({
    	"error": {
    		"message": [
    			"instance.pages is not of a type(s) integer"
    		],
    		"status": 400
    	}
    })
  })
  test("Should see an error with invalid request", async function() {
    const response = await request(app)
      .post(`/books`)
      .send(book1)
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({ book: book1 })
  })
})

describe("PUT /books", function() {
  test("Updates a book", async function() {
    const response = await request(app)
      .put(`/books/0691161518`)
      .send(book2)
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ book:book2 })
  })
})
