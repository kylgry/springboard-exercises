const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const db = require("../db")
const slugify = require('slugify')

router.get('/', async function(req, res, next) {
  try {
    const result = await db.query(
      `SELECT i.industry, ci.co
       FROM industries AS i
       LEFT JOIN companies_industries AS ci
       ON i.code = ci.ind`)
    // const industries = [...new Set(result.rows.map(r => r.industry))]
    const query = await db.query(`SELECT i.industry FROM industries as I`)
    const industries = query.rows

    for (industry of industries) {
      for (row of result.rows) {
        console.log(row)
        if (industry.industry == row.industry) {
          if (!industry.companies) { industry.companies = [] }
          if (row.co) {industry.companies.push(row.co)}
        }
      }
    }

    return res.json(industries)
  } catch(error) {
    next(error)
  }
})

router.post('/', async function(req, res, next) {
  try {
    const query = await db.query(
      `INSERT INTO industries (code, industry)
       VALUES ($1, $2)
       RETURNING code, industry`,
       [req.body.code, req.body.industry])
    return res.status(201).json(query.rows[0])
  } catch(error) {
    next(error)
  }
})

router.post('/relate', async function(req, res, next) {
  try {
    const query = await db.query(
      `INSERT INTO companies_industries (co, ind)
       VALUES ($1, $2)
       RETURNING co, ind`,
       [req.body.co, req.body.ind])
    return res.status(201).json(query.rows[0])
  } catch(error) {
    next(error)
  }
})



module.exports = router
