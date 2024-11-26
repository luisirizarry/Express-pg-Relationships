const db = require("../db");
const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");

router.get('/:id', async (req, res, next) => {
  try{
    const { id } = req.params;
    const results = await db.query(`SELECT id, msg FROM messages WHERE id=$1`, [id]);
    if(results.rows.length === 0){
      throw new ExpressError(`Can't find message with that id: ${id}`, 404);
    }
    return res.send(results.rows[0]);
  } catch (e) {
    return next(e);
  }
})





module.exports = router;