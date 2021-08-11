const router = require("express").Router();

const controller    = require("../controllers/UserController");
const jwt           = require("../utils/Jwt");

router.post("/sign",      controller.signUser);
router.post("/refresh",
    jwt.checkToken,
    controller.refreshToken
);

module.exports = router;