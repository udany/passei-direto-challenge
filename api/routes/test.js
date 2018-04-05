import express from 'express';
import CollectionModel from "../models/CollectionModel";
import Collection from "../../shared/entities/Collection";

import db from '../Database';
import {DatabaseQueryCondition} from "../js/DatabaseQueryComponent";
import AlbumModel from "../models/AlbumModel";

let router = express.Router();

router.get('/', async function (req, res, next) {
    res.send(AlbumModel.getCreateStatement());
});

router.get('/i', async function (req, res, next) {
    let obj = new Collection({
        "name": "Chill mix",
        description: 'Test2'
    });

    await CollectionModel.save(db, obj);

    res.send(obj);
});

router.get('/t', async function (req, res, next) {
    let rows = await CollectionModel.select(db, [{
        column: 'id',
        values: 1
    }]);

    res.send(rows);
});

router.get('/id', async function (req, res, next) {
    let rows = await CollectionModel.getById(db, 1);

    res.send(rows);
});

module.exports.path = '/test';
module.exports.router = router;
