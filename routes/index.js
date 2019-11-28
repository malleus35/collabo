const express = require("express");
const router = express.Router();
const userRouter = require("./users/index");
const officeRouter = require("./offices/index");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/users", userRouter);
router.use("/offices", officeRouter);

module.exports = router;
