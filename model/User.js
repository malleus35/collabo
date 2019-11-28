const authUtil = require("../module/util/authUtils");
const utils = require("../module/util/utils");
const responseMessage = require("../module/util/responseMessage");
const statusCode = require("../module/util/statusCode");
const pool = require("../module/pool");
const user = {
  signIn: async (userId, userPwd) => {
    const query = `SELECT userIdx, userId FROM users WHERE userId="${userId}" AND userPwd="${userPwd}";`;
    const result = await pool.queryParam_None(query);

    return new Promise((resolve, reject) => {
      if (!result)
        reject(
          utils.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
      else
        resolve(
          utils.successTrue(
            statusCode.OK,
            responseMessage.SIGN_UP_SUCCESS,
            result[0]
          )
        );
    });
  },
  signUp: async (userId, userPwd) => {
    const query = `INSERT INTO users (userId, userPwd) VALUES (?,?);`;
    const value = [userId, userPwd];
    const result = await pool.queryParam_Parse(query, value);

    return new Promise((resolve, reject) => {
      if (!result)
        reject(
          utils.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
      else
        resolve(
          utils.successTrue(statusCode.OK, responseMessage.SIGN_UP_SUCCESS)
        );
    });
  },
  Read: async userIdx => {
    const query = `SELECT userIdx, userId FROM users WHERE userIdx=${userIdx};`;
    const result = await pool.queryParam_None(query);

    return new Promise((resolve, reject) => {
      if (!result)
        reject(
          utils.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
      else if (result.length === 0)
        reject(
          utils.successFalse(statusCode.NOT_FOUND, responseMessage.NO_USER)
        );
      else
        resolve(
          utils.successTrue(
            statusCode.OK,
            responseMessage.USER_SELECTED,
            result[0]
          )
        );
    });
  }
};

module.exports = user;
