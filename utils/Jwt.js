const jwt = require("jsonwebtoken");
const conf = require("../config/config");

exports.signToken = (userId) => {
    const refreshToken = jwt.sign({},
        conf.JWT_SECRET, {
            expiresIn: conf.JWT_R_TOKEN_EXPIRED_IN,
            issuer: conf.JWT_ISSUER
        }
    )
    const accessToken = jwt.sign({ id: userId },
        conf.JWT_SECRET, {
            expiresIn: conf.JWT_A_TOKEN_EXPIRED_IN,
            issuer: conf.JWT_ISSUER
        }
    )
    return { accessToken, refreshToken };
}

/**
 * Token이 아예 없으면 403 에러코드를 리턴하고 Token이
 * 만료되거나 유효하지 않으면 401 에러코드를 리턴한다.
 * 
 * Token이 유효하면 Payload를 Decoding해서
 * User의 Primary Key를 req에 user_id Key로 입력한다.
 */
exports.checkToken = (req, res, next) => {
    const accessToken = req.header("X-AUTH-TOKEN");
    if (accessToken) {
        const decoded = verifyToken(accessToken);
        if (decoded) {
            req.user_id = decoded.id;
            next(); 
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(403);
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, conf.JWT_SECRET);
    } catch (e) {
        switch (e.name) {
            case "TokenExpiredError":
                console.error('expired token');
                break;
            case "TokenExpiredError":
                console.error("invalid token");
                break;
            default:
                console.error("invalid token");
        }
    }
    return null;
}