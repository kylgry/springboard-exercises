/** User class for message.ly */
const db = require("../db");
const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config")
const jwt = require("jsonwebtoken");

/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) {
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const join_at = new Date(Date.now())
    const last_login_at = join_at
    const result = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING username, password, first_name, last_name, phone`,
      [username, hashedPassword, first_name, last_name, phone, join_at, last_login_at])
    return result.rows[0]
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT password FROM users WHERE username = $1`,
      [username])
    const user = result.rows[0]
    const auth = await bcrypt.compare(password, user.password)
    return auth
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const time = new Date(Date.now())
    const result = await db.query(
      `UPDATE users
       SET last_login_at=$1
       WHERE username=$2`,
       [time, username])
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const result = await db.query(
      `SELECT username, first_name, last_name, phone FROM users`)
    return result.rows
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const result = await db.query(
      `SELECT username, first_name, last_name, phone, join_at, last_login_at
       FROM users
       WHERE username=$1`,
      [username])
    return result.rows[0]
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    const result = await db.query(
      `SELECT id, to_username, body, sent_at, read_at
       FROM messages
       WHERE from_username=$1`,
       [username])
    return result.rows[0]
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    const result = await db.query(
      `SELECT id, from_username, body, sent_at, read_at
       FROM messages
       WHERE to_username=$1`,
       [username])
    return result.rows[0]
  }
}


module.exports = User;
