const jwt = require("jsonwebtoken");
const conf = require("../config/config");

/**
 * Token이 아예 없으면 403 에러코드를 리턴하고 Token이
 * 만료되거나 유효하지 않으면 401 에러코드를 리턴한다.
 * 
 * Token이 유효하면 Payload를 Decoding해서
 * User의 Primary Key를 req에 user_id Key로 입력한다.
 */
exports.checkToken = (req, res, next) => {
    const accessToken = req.headers["X-AUTH-TOKEN"];
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
        console.log(`Token error name is ${e.name}`)
        if (err.message === 'jwt expired') {
            console.log('expired token');
        } else if (err.message === 'invalid token') {
            console.log('invalid token');
        } else {
            console.log("invalid token");
        }
    }
    return null;
}