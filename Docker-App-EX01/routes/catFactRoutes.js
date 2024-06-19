const express = require("express");
const router = express.Router();
const catFactController = require("../controllers/catFactController");

router.get('/', catFactController.getCatFacts);

module.exports = router;
