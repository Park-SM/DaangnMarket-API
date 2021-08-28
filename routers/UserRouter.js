const router = require("express").Router();

const controller    = require("../controllers/UserController");
const validator     = require("../utils/Validator");
const jwt           = require("../utils/Jwt");

router.post("/login",
    validator.body("phone", "address"),
    controller.login
);
router.post("/loginWithToken",
    jwt.checkToken,
    controller.loginWithToken
);
router.post("/refresh",
    jwt.checkToken,
    controller.refreshToken
);

module.exports = router;