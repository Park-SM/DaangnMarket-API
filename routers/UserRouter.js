const router = require("express").Router();
const controller = require("../controllers/UserController");

router.post("/sign",      controller.signUser);
router.post("/refresh",   controller.refreshToken);

module.exports = router;