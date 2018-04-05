import path from 'path';
import fs from 'fs';
import express from 'express';
import AlbumModel from "../models/AlbumModel";
import Collection from "../../shared/entities/Collection";

import db from '../Database';
import {Reply} from "../base/Reply";

let router = express.Router();

router.get('/', async function (req, res, next) {
    let data = await AlbumModel.select(db);

    res.send(data);
});

router.get('/:id', async function (req, res, next) {
    let data = await AlbumModel.getById(db, req.params.id);

    res.send(data);
});

router.post('/:id', async function (req, res, next) {
    const obj = new Collection(req.body);
    await AlbumModel.save(db, obj, ['name', 'artist', 'releaseYear']);

    await AlbumModel.saveImage(db, obj);

    res.send(obj);
});

router.delete('/:id', async function (req, res, next) {
    let data = await AlbumModel.deleteById(db, req.params.id);

    res.send(new Reply(data));
});

module.exports.path = '/album';
module.exports.router = router;
