"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Job {
  /** Create a job (from data), update db, return new company data.
   *
   * data should be { title, salary, equity, companyHandle }
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * Throws BadRequestError if job already in database.
   * */

  static async create({ title, salary, equity, companyHandle }) {
    const companyCheck = await db.query(
          `SELECT handle
           FROM companies
           WHERE handle = $1`,
        [companyHandle]);

    if (!companyCheck.rows[0])
      throw new BadRequestError(`Company not in database: ${companyHandle}`);

    const result = await db.query(
          `INSERT INTO jobs
           (title, salary, equity, company_handle)
           VALUES ($1, $2, $3, $4)
           RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
        [
          title,
          salary,
          equity,
          companyHandle
        ],
    );
    const job = result.rows[0];
    return job;
  }

  /** Find all jobs.
   *
   * Returns [{ id, title, salary, equity, companyHandle }, ...]
   * */

  static async findAll() {
    const jobsRes = await db.query(
          `SELECT id,
                  title,
                  salary,
                  equity,
                  company_handle AS "companyHandle"
           FROM jobs
           ORDER BY company_handle`);
    return jobsRes.rows;
  }

  /** Find all companies given filters for maxEmployees, minEmployees.
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

  static async findAllFiltered(filter={}) {

    const { title, minSalary, hasEquity, companyHandle } = filter

    // constructs base query, if no filters are given
    // this function is the same as findAll()
    let query = `
      SELECT id,
             title,
             salary,
             equity,
             company_handle AS "companyHandle"
      FROM jobs`

    let queryFilters = []

    // constructs filters to combine in WHERE string if provided
    if (minSalary) queryFilters.push(`salary >= ${minSalary}`)
    if (hasEquity) queryFilters.push(`equity > 0`)
    if (title) queryFilters.push(`LOWER(title) LIKE '%${title.toLowerCase()}%'`)
    if (companyHandle) queryFilters.push(`company_handle = '${companyHandle}'`)

    // constructs WHERE string if any filters were given
    if (queryFilters.length != 0) {
      query += `\nWHERE ${queryFilters.join(" AND ")}`
    }

    // order by must go last
    query += `\nORDER BY company_handle`

    console.log(query)

    // sends query to db and returns
    const jobsRes = await db.query(query);
    return jobsRes.rows;
  }



  /** Given an id, return data about job.
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const jobRes = await db.query(
          `SELECT id,
                  title,
                  salary,
                  equity,
                  company_handle AS "companyHandle"
           FROM jobs
           WHERE id = $1`,
        [id]);

    const job = jobRes.rows[0];

    if (!job) throw new NotFoundError(`No job id: ${id}`);

    return job;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, salary, equity}
   *
   * Returns {id, title, salary, equity, companyHandle}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          companyHandle: "company_handle"
        });
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs
                      SET ${setCols}
                      WHERE id = ${idVarIdx}
                      RETURNING id,
                                title,
                                salary,
                                equity,
                                company_handle AS "companyHandle"`;
    const result = await db.query(querySql, [...values, id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job id: ${id}`);

    return job;
  }

  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`,
        [id]);
    const job = result.rows[0];
    console.log(job)

    if (!job) throw new NotFoundError(`No job id: ${id}`);
  }
}


module.exports = Job;
