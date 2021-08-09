const User  = require("../models").User;
const conf  = require("../config/config");
const jwt   = require("../utils/Jwt");
const Op    = require("sequelize").Op;

exports.signUser = async (req, res) => {
    const email     = req.body.email;
    const address   = parseInt(req.body.address);

    User.findOrCreate({
        where: { email: { [Op.eq]: email} },
        default: {
            email,
            village1: address,
        }
    })
    .then(user => {
        const tokens = jwt.signToken(user.id);
        res.send({
            accessToken: tokens.accessToken,
            expiredIn: conf.JWT_A_TOKEN_EXPIRED_IN,
            refreshToken: tokens.refreshToken,
            refreshToken_expiredIn: conf.JWT_R_TOKEN_EXPIRED_IN
        });
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    })
}

exports.refreshToken = async (req, res) => {
    
}