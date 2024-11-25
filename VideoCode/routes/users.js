/** Routes for users of pg-relationships-demo. */

const db = require("../db");
const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");



/** Get users: [user, user, user] */
router.get("/", async function (req, res, next) {
  try {
    const results = await db.query(
      `SELECT id, name, type FROM users`);

    return res.json(results.rows);
  }

  catch (err) {
    return next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {

  } catch (e) {
    next(e);
  }
})

/** Get user: {name, type, messages: [{msg, msg}]} */

module.exports = router;