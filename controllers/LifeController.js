const { sequelize, LifePost, LifeCategory } = require("../models");
const { QueryTypes } = require('sequelize');

exports.posts = async (req, res) => {
    const userId = req.user_id;
    const radius = req.query.radius;
    const page   = parseInt(req.query.page);
    const size   = parseInt(req.query.size);

    try {
        const address = await sequelize.query(`
            SELECT address.*
            FROM user
            JOIN address ON user.village1 = address.id
            WHERE user.id = :id
        `, {
            replacements: { 
                id: userId
            },
            type: QueryTypes.SELECT
        });
        if (!address) throw "Not found village1 resource."

        const rows = await sequelize.query(`
            SELECT
                a_tb.id,
                a_tb.userId,
                a_tb.userName,
                a_tb.content,
                a_tb.category,
                a_tb.imgpath,
                a_tb.address,
                a_tb.createdAt
            FROM (
                SELECT
                    lifepost.id          AS id,
                    user.id              AS userId,
                    user.name            AS userName,
                    lifepost.content     AS content,
                    lifecategory.name    AS category,
                    lifecategory.imgpath AS imgpath,
                    address.id           AS addressId,
                    address.address      AS address,
                    lifepost.createdAt   AS createdAt
                FROM lifepost
                JOIN address      ON lifepost.address_id = address.id
                JOIN lifecategory ON lifepost.category_id = lifecategory.id
                JOIN user         ON lifepost.user_id = user.id
            ) AS a_tb
            JOIN (
                SELECT *,
                    (6371*acos(cos(radians(:latitude))*cos(radians(latitude))*cos(radians(longitude)
                    -radians(:longitude))+sin(radians(:latitude))*sin(radians(latitude))))
                    AS distance
                FROM address
                HAVING distance <= :radius
            ) AS b_tb
            ON a_tb.addressId = b_tb.id
            ORDER BY b_tb.distance
            LIMIT :offset, :limit
        `, {
            replacements: { 
                latitude:  address[0].latitude,
                longitude: address[0].longitude,
                radius:    radius * 0.001,   // 1km = 1
                offset:    page * size,
                limit:     size
            },
            type: QueryTypes.SELECT
        });

        res.send({
            radius,
            nextPage: page + 1,
            pageSize: size,
            count: rows.length,
            data: rows
        });

    } catch(e) {
        console.error(e);
        res.sendStatus(500);
    }
}

exports.categories = async (_, res) => {
    LifeCategory.findAll()
    .then(rows => {
        res.send({
            count: rows.length,
            data: rows
        });
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
}