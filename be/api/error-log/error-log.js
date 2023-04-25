const express = require('express');
const { logger } = require('../../common/functions');
const router = express.Router();

const errLog = (req, res) => {
  try {
    const log = {
      msg: req.body.msg,
      type: 'error',
      severity: 3
    };
    logger.error(`UNHANDLED CLIENT-SIDE-ERROR => ${JSON.stringify(log)}`, {});
    res.json({
      err: null,
      data: {}
    });
  } catch (e) {
    logger.error(`Error during errorLog : ${JSON.stringify(e.message || e, null, 2)}`, {});
    res.status(500).json({
      err: 'Error during errorLog',
      data: null
    });
  }
};

router.post('/error-log', errLog);
module.exports = router;