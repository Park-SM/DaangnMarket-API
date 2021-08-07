const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.sendStatus(404);
})

module.exports = router;