const { sequelize, Address } = require("../models");
const { QueryTypes } = require('sequelize');
const Op = require("sequelize").Op;

exports.getAround = async (req, res) => {
    const latitude  = req.query.latitude;
    const longitude = req.query.longitude;
    const page      = parseInt(req.query.page);
    const size      = parseInt(req.query.size);

    try {
        const rows = await sequelize.query(`
            SELECT *,
                (6371*acos(cos(radians(:latitude))*cos(radians(latitude))*cos(radians(longitude)
                -radians(:longitude))+sin(radians(:latitude))*sin(radians(latitude))))
                AS distance
            FROM address
            ORDER BY distance
            LIMIT :offset, :limit`,
            {
                replacements: { 
                    latitude,
                    longitude,
                    offset: page * size,
                    limit: size
                },
                type: QueryTypes.SELECT
            },
        );
        res.send({
            result: "success",
            latitude,
            longitude,
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

exports.getSearch = async (req, res) => {
    const search    = req.query.search;
    const page      = parseInt(req.query.page);
    const size      = parseInt(req.query.size);

    Address.findAll({
        where: {
            address: { [Op.like]:`%${search}%`}
        },
        offset: page * size,
        limit: size
    }).then(results => {
        res.send({
            result: "success",
            search: search,
            nextPage: page + 1,
            pageSize: size,
            count: results.length,
            data: results
        });
    }).catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
}

exports.getLocation = async (req, res) => {
    const latitude  = req.query.latitude;
    const longitude = req.query.longitude;
    const radius    = req.query.radius;

    try {
        const rows = await sequelize.query(`
            SELECT *,
                (6371*acos(cos(radians(:latitude))*cos(radians(latitude))*cos(radians(longitude)
                -radians(:longitude))+sin(radians(:latitude))*sin(radians(latitude))))
                AS distance
            FROM address
            HAVING distance <= :radius
            ORDER BY distance`,
            {
                replacements: { 
                    latitude,
                    longitude,
                    radius: radius * 0.001  // 1km = 1
                },
                type: QueryTypes.SELECT
            },
        );
        res.send({
            result: "success",
            latitude,
            longitude,
            radius,
            count: rows.length,
            data: rows
        });
    } catch(e) {
        console.error(e);
        res.sendStatus(500);
    }
}