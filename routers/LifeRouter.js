const router = require("express").Router();

const controller    = require("../controllers/LifeController");
const validator     = require("../utils/Validator");
const jwt           = require("../utils/Jwt");

router.get("/posts",
    validator.query("radius", "page", "size"),
    jwt.checkToken,
    controller.posts
);
router.get("/categories",
    jwt.checkToken,
    controller.categories
);

module.exports = router;