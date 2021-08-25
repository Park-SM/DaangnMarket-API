const router = require("express").Router();

const controller    = require("../controllers/UserController");
const jwt           = require("../utils/Jwt");

router.post("/login",      controller.login);
router.post("/refresh",
    jwt.checkToken,
    controller.refreshToken
);

module.exports = router;