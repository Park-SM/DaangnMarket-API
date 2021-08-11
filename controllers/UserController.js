const User  = require("../models").User;
const conf  = require("../config/config");
const jwt   = require("../utils/Jwt");
const Op    = require("sequelize").Op;

exports.signUser = async (req, res) => {
    const email     = req.body.email;
    const address   = parseInt(req.body.address);

    let userId = -1;
    let tokens = null;
    User.findOrCreate({
        where: { email },
        defaults: {
            village1: address
        }
    })
    .then(([user, _]) => {
        userId = user.dataValues.id;
        tokens = jwt.signToken(userId); 
        return User.update({ refreshToken: tokens.refreshToken }, { where: { id: { [Op.eq]: userId }}});
    })
    .then(cnt => {
        if (cnt < 1 || userId == -1) throw "NotFoundException";

        res.send({
            accessToken: tokens.accessToken,
            expiredIn: conf.JWT_A_TOKEN_EXPIRED_IN,
            refreshToken: tokens.refreshToken,
            refreshToken_expiredIn: conf.JWT_R_TOKEN_EXPIRED_IN
        });
    })
    .catch(error => {
        console.error(error);
        switch (error) {
            case "NotFoundException": 
                res.sendStatus(404);
                break;
            default:
                res.sendStatus(500);
                break;
        }
    })
}

exports.refreshToken = async (req, res) => {
    const refreshToken = req.header("X-AUTH-TOKEN");
    if (refreshToken) {
        User.findOne({where: {refreshToken: {[Op.eq]: refreshToken}}})
        .then(user => {
            if (!user) throw "NotFoundException";

            const tokens = jwt.signToken(user.id);
            res.send({
                accessToken: tokens.accessToken,
                expiredIn: conf.JWT_A_TOKEN_EXPIRED_IN
            });
        })
        .catch(error => {
            console.error(error);
            switch(error) {
                case "NotFoundException":
                    res.sendStatus(404);
                    break;
                default:
                    res.sendStatus(500);
                    break;
            }
        });
    } else {
        res.sendStatus(403);
    }
}
