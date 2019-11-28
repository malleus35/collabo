const authUtil = require("../module/util/authUtils");
const utils = require("../module/util/utils");
const responseMessage = require("../module/util/responseMessage");
const statusCode = require("../module/util/statusCode");
const pool = require("../module/pool");

const office = {
  ReadAll: async () => {
    const query = `select * from offices;`;
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
          utils.successFalse(statusCode.NO_CONTENT, responseMessage.NO_OFFICE)
        );
      else
        resolve(
          utils.successTrue(
            statusCode.OK,
            responseMessage.OFFICE_READ_SUCCESS,
            result
          )
        );
    });
  }
};

module.exports = office;
