const router = require("express").Router();

const controller    = require("../controllers/AddressController");
const validator     = require("../utils/Validator");
const jwt           = require("../utils/Jwt");

router.get("/around",
    validator.query("latitude", "longitude", "page", "size"),
    controller.getAround
);

router.get("/search",
    validator.query("search", "page", "size"),
    controller.getSearch
);

router.get("/location",
    jwt.checkToken,
    validator.query("latitude", "longitude", "radius"),
    controller.getLocation
);

module.exports = router;