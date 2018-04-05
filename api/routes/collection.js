import express from 'express';
import CollectionModel from "../models/CollectionModel";
import Collection from "../../shared/entities/Collection";

import db from '../Database';
import {Reply} from "../base/Reply";

let router = express.Router();

router.get('/', async function (req, res, next) {
    let data = await CollectionModel.select(db);

    res.send(data);
});

router.get('/:id', async function (req, res, next) {
    let data = await CollectionModel.getById(db, req.params.id);

    res.send(data);
});

router.post('/:id', async function (req, res, next) {
    const obj = new Collection(req.body);
    await CollectionModel.save(db, obj, ['name', 'description']);

    await CollectionModel.saveImage(db, obj);

    res.send(obj);
});

router.delete('/:id', async function (req, res, next) {
    let data = await CollectionModel.deleteById(db, req.params.id);

    res.send(new Reply(data));
});

module.exports.path = '/collection';
module.exports.router = router;
