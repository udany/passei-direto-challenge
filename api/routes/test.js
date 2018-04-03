import express from 'express';
import CollectionModel from "../models/CollectionModel";
import Collection from "../../shared/entities/Collection";

import db from '../Database';

let router = express.Router();

router.get('/', async function (req, res, next) {


    res.send(CollectionModel.getCreateStatement());
});

router.get('/i', async function (req, res, next) {
    let obj = new Collection({
        id: 1,
        "name": "Chill mix",
        description: 'Test2'
    });

    res.send(await CollectionModel.save(db, obj));
});

router.get('/t', async function (req, res, next) {
    let [rows, fields] = await db.query('SELECT * FROM `collection`');

    res.send(rows);
});

module.exports.path = '/test';
module.exports.router = router;
