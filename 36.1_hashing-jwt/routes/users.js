const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const db = require("../db")
const User = require("../models/user")
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");



/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get("/", authenticateJWT, ensureLoggedIn, async function(req, res, next) {
try {
  const users = await User.all()
  return res.json(users)
  } catch(e) {
    next(e)
  }
})


/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

 router.get("/:username", authenticateJWT, ensureLoggedIn, ensureCorrectUser, async function(req, res, next) {
   try {
     const user = await User.get(req.params.username)
     return res.json(user)
   } catch(e) {
     next(e)
   }
 })


/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

 router.get("/:username/to", authenticateJWT, ensureLoggedIn, ensureCorrectUser, async function(req, res, next) {
   try {
     const messagesTo = await User.messagesTo(req.params.username)
     if (!messagesTo) return res.json({message: "No messages"})
     return res.json(messagesTo)
   } catch(e) {
     next(e)
   }
 })


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

 router.get("/:username/from", authenticateJWT, ensureLoggedIn, ensureCorrectUser, async function(req, res, next) {
   try {
     const messagesFrom = await User.messagesFrom(req.params.username)
     if (!messagesFrom) return res.json({message: "No messages"})
     return res.json(messagesFrom)
   } catch(e) {
     next(e)
   }
 })

 module.exports = router
