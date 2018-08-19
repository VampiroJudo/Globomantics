const express = require('express');
var cors = require('cors');
const router = express.Router();


require('./routes/transaction')(router);
require('./routes/user')(router);

module.exports = router;
