const express = require("express");
const router = express.Router();
const User = require("../../model/User");
const statusCode = require("../../module/util/statusCode");
const responseMessage = require("../../module/util/responseMessage");
/* GET users listing. */
router.post("/signin", function(req, res, next) {
  const { userId, userPwd } = req.body;

  if (!userId || !userPwd)
    res.status(statusCode.UNAUTHORIZED).send(responseMessage.NULL_VALUE);
  User.signIn(userId, userPwd)
    .then(result => res.status(result.status).json(result))
    .catch(err => res.status(err.status).json(err));
});

router.post("/signup", function(req, res, next) {
  const { userId, userPwd } = req.body;

  if (!userId || !userPwd)
    res.status(statusCode.UNAUTHORIZED).send(responseMessage.NULL_VALUE);

  User.signUp(userId, userPwd)
    .then(result => res.status(result.status).json(result))
    .catch(err => res.status(err.status).json(err));
});

router.get("/:userIdx", function(req, res, next) {
  const userIdx = req.params.userIdx;
  User.Read(userIdx)
    .then(result => {
      res.status(result.status).json(result);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});
module.exports = router;
