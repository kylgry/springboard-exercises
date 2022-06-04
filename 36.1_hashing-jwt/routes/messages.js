const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const db = require("../db")
const Message = require("../models/message")
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

 router.get("/:id", authenticateJWT, ensureLoggedIn, async function(req, res, next) {
   try {
     const message = await Message.get(req.params.id)
     const user = req.user.username
     if (user == message.from_user.username || user == message.to_user.username) {
       return res.json(message)
     }
     else {
       throw new ExpressError('Unauthorized', 400)
     }
   } catch(e) {
     next(e)
   }
 })


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

 router.post("/", authenticateJWT, ensureLoggedIn, async function(req, res, next) {
   try {
     const { to_username, body } = req.body
     const from_username = req.user.username
     const message = await Message.create({from_username, to_username, body})
     return res.json(message)
   } catch(e) {
     next(e)
   }
 })


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

 router.post("/:id/read", authenticateJWT, ensureLoggedIn, async function(req, res, next) {
   try {
     const id = req.params.id
     const message = await Message.get(id)
     if (message.to_user.username == req.user.username) {
       const result = await Message.markRead(id)
       return res.json({message: "Message marked as read"})
     }
     throw new ExpressError('Unauthorized', 400)
   } catch(e) {
     next(e)
   }
 })

 module.exports = router
