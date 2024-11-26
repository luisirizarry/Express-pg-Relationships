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

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const userResults = await db.query(`SELECT name, type FROM users WHERE id = $1`, [id]);
    if(userResults.rows.length === 0){
      throw new ExpressError(`Cannot find user with that id: ${id}`, 404);
    }
    const msgResults = await db.query(`SELECT id, msg FROM messages WHERE user_id=$1`, [id]);

    const user = userResults.rows[0];
    user.messages = msgResults.rows;
    return res.json(user)
  } catch (e) {
    return next(e);
  }
});

/** Get user: {name, type, messages: [{msg, msg}]} */

module.exports = router;