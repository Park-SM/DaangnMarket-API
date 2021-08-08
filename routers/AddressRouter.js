const router = require("express").Router();
const controller = require("../controllers/AddressController")
const validator = require("../utils/Validator")

router.get("/around",
    validator.query("latitude", "longitude", "page", "size"),
    controller.getAround
);

router.get("/search",
    validator.query("search", "page", "size"),
    controller.getSearch
);

router.get("/location",
    validator.query("latitude", "longitude", "radius"),
    controller.getLocation
);

module.exports = router;