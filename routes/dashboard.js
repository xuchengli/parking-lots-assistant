/**
 * Created by lixuc on 2017/7/16.
 */
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    res.render("dashboard");
});
module.exports = router;