const express = require("express");
const router = express.Router();
const Office = require("../../model/Office");
/* GET home page. */
router.get("/", function(req, res, next) {
  Office.ReadAll()
    .then(result => {
      res.status(result.status).json(result);
    })
    .catch(err => res.status(result.status).json(err));
});

module.exports = router;
