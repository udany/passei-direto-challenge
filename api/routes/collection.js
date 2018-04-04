import express from 'express';
import CollectionModel from "../models/CollectionModel";
import Collection from "../../shared/entities/Collection";

import db from '../Database';

let router = express.Router();

router.get('/', async function (req, res, next) {
    let data = await CollectionModel.select(db);

    res.send(data);
});

router.get('/:id', async function (req, res, next) {
    let data = await CollectionModel.getById(db, req.params.id);

    res.send(data);
});

module.exports.path = '/collection';
module.exports.router = router;
