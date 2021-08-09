exports.query = (...requiredQuery) => {
    return (req, res, next) => {
        let validate = true;

        for (rq of requiredQuery) {
            if (!req.query[rq]) validate = false;
        }

        if (validate) next(); else res.sendStatus(400);
    }
}