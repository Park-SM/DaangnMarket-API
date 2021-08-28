const User  = require("../models").User;
const conf  = require("../config/config");
const jwt   = require("../utils/Jwt");
const Op    = require("sequelize").Op;

exports.login = async (req, res) => {
    const phone     = req.body.phone;
    const address   = parseInt(req.body.address);

    /**
     * 기존에 존재하는 회원이면 existing 값을 false로 res.send하고,
     * 앱에서는 계정에 소유권을 확인해야함. 하지만 이 부분은 구현하지 않을 예정.
     * 여기에서 기존에 존재하는 회원인지 확인하는 소스 작성.
     */

    let userId = null;
    let tokens = null;
    User.findOrCreate({
        where: { phone },
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
        if (cnt < 1 || !userId) throw "NotFoundException";

        res.send({
            existing: true,
            accessToken: tokens.accessToken,
            expiredIn: conf.JWT_A_TOKEN_EXPIRED_IN,
            refreshToken: tokens.refreshToken,
            refreshToken_expiredIn: conf.JWT_R_TOKEN_EXPIRED_IN
        });
    })
    .catch(error => {
        console.error(error);
        switch (error) {
            default:
                res.sendStatus(500);
                break;
        }
    })
}

exports.loginWithToken = async (req, res) => {
    const userId = req.user_id;

    let tokens = null;
    User.findOne({ where: { id: { [Op.eq]: userId}}})
        .then(user => {
            if (!user) throw "NotFoundException";

            tokens = jwt.signToken(userId);
            return User.update({ refreshToken: tokens.refreshToken }, { where: { id: { [Op.eq]: userId }}});
        })
        .then(cnt => {
            if (cnt < 1) throw "NotFoundException";

            res.send({
                accessToken: tokens.accessToken,
                expiredIn: conf.JWT_A_TOKEN_EXPIRED_IN,
                refreshToken: tokens.refreshToken,
                refreshToken_expiredIn: conf.JWT_R_TOKEN_EXPIRED_IN
            });
        })
        .catch(error => {
            console.error(error);
            switch(error) {
                case "NotFoundException":
                    res.sendStatus(422);
                    break;
                default:
                    res.sendStatus(500);
                    break;
            }
        });
}

exports.refreshToken = async (req, res) => {
    const refreshToken = req.header("X-AUTH-TOKEN");    // Jwt Middleware에서 undefine 아닌지 확인 함
    
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
                res.sendStatus(422);
                break;
            default:
                res.sendStatus(500);
                break;
        }
    });
    
}
