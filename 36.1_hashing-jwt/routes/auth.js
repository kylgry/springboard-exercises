const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const db = require("../db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const User = require("../models/user")

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

 router.post("/login", async (req, res, next) => {
   try {
     const { username, password } = req.body
     const auth = await User.authenticate(username, password)
     if (auth) {
       const token = jwt.sign({username}, SECRET_KEY)
       return res.json({message: 'Login successful', token })
     }
     else { return res.json({message: 'Login unsuccessful'}) }
   } catch(e) {
     next(e)
   }
 })


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post('/register', async (req, res, next) => {
 try {
   const { username, password, first_name, last_name, phone } = req.body
   if (!username || !password) { throw new ExpressError("Username or password missing", 400) }
   const user = await User.register({username, password, first_name, last_name, phone})
   const token = jwt.sign(user.username, SECRET_KEY)
   return res.json({ message: `User successfully registered.`, token })
 } catch (e) {
   if (e.code === '23505') {
     return next(new ExpressError("Username taken. Please pick another!", 400));
   }
   return next(e)
 }
})

module.exports = router
