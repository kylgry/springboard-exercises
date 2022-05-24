const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const db = require("../db")

router.get('/', async function(req, res, next) {
  try {
    const result = await db.query(
      `SELECT * FROM invoices`)
    return res.json({invoices: result.rows})
  } catch(error) {
    next(error)
  }

})

router.get('/:id', async function(req, res, next) {
  try {
    const result = await db.query(
      `SELECT * FROM invoices
      WHERE id=$1`,[req.params.id])
    return res.json({company: result.rows[0]})
  }
  catch(error) {
    next(error)
  }
})

router.post('/', async function(req, res, next) {
  try {
    const query = await db.query(
      `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, comp_code, amt, paid, add_date, paid_date`,
       [req.body.comp_code, req.body.amt, req.body.paid, req.body.add_date, req.body.paid_date])
    return res.status(201).json(query.rows[0])
  } catch(error) {
    next(error)
  }
})

router.put('/:id', async function(req, res, next) {
  try {
    const query = await db.query(
      `UPDATE invoices SET comp_code=$1, amt=$2, paid=$3, add_date=$4, paid_date=$5
       WHERE id = $6
       RETURNING id, comp_code, amt, paid, add_date, paid_date`,
       [req.body.comp_code, req.body.amt, req.body.paid, req.body.add_date, req.body.paid_date, req.params.id])
    return res.status(200).json(query.rows[0])
  } catch(error) {
    next(error)
  }
})

router.delete('/:id', async function(req, res, next) {
  try {
    const query = await db.query(
      "DELETE FROM invoices WHERE id = $1",
      [req.params.id])
    return res.status(200).json({message: "Deleted"})
  } catch(error) {
    next(error)
  }
})

module.exports = router
