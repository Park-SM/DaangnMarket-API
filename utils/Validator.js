exports.query = (...requiredQuery) => {
    return (req, res, next) => {
        let validate = true;

        for (rq of requiredQuery) {
            if (!req.query[rq]) validate = false;
        }

        if (validate) next(); else res.sendStatus(400);
    }
}

exports.body = (...requiredbody) => {
    return (req, res, next) => {
        let validate = true;

        for (b of requiredbody) {
            if (!req.body[b]) validate = false;
        }

        if (validate) next(); else res.sendStatus(400);
    }
}