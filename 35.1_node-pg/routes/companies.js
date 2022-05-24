const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const db = require("../db")

router.get('/', async function(req, res, next) {
  try {
    const result = await db.query(
      `SELECT * FROM companies`)
    return res.json({companies: result.rows})
  } catch(error) {
    next(error)
  }

})

router.get('/:code', async function(req, res, next) {
  try {
    const query = await db.query(
      `SELECT * FROM companies
      WHERE code=$1`,[req.params.code])

    const invoices = await db.query(
      `SELECT * from invoices
       WHERE comp_code = $1`,
       [req.params.code])
    const comp = query.rows[0]
    comp.invoices = invoices.rows
    return res.json({company: comp})
  }
  catch(error) {
    next(error)
  }
})

router.post('/', async function(req, res, next) {
  try {
    const query = await db.query(
      `INSERT INTO companies (code, name, description)
       VALUES ($1, $2, $3)
       RETURNING code, name, description`,
       [req.body.code, req.body.name, req.body.description])
    return res.status(201).json(query.rows[0])
  } catch(error) {
    next(error)
  }
})

router.put('/:code', async function(req, res, next) {
  try {
    const query = await db.query(
      `UPDATE companies SET name=$1, description=$2
       WHERE code = $3
       RETURNING code, name, description`,
       [req.body.name, req.body.description, req.params.code])
    return res.status(200).json(query.rows[0])
  } catch(error) {
    next(error)
  }
})

router.delete('/:code', async function(req, res, next) {
  try {
    const query = await db.query(
      "DELETE FROM companies WHERE code = $1",
      [req.params.code])
    return res.status(200).json({message: "Deleted"})
  } catch(error) {
    next(error)
  }
})

module.exports = router
