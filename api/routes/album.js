import express from 'express';
import AlbumModel from "../models/AlbumModel";

import db from '../Database';
import {Reply} from "../base/Reply";
import Album from "../../shared/entities/Album";
import {DatabaseQueryClause, DatabaseQueryCondition} from "../js/DatabaseQueryComponent";

let router = express.Router();

router.get('/', async function (req, res, next) {
    let data = await AlbumModel.select(db);

    res.send(data);
});

router.get('/search', async function (req, res, next) {
    let query = req.query.q;

    let data = await AlbumModel.select(db, [
        new DatabaseQueryClause([
            new DatabaseQueryCondition({
                column: 'name',
                operator: 'LIKE',
                values: `%${query}%`
            }),
            new DatabaseQueryCondition({
                column: 'artist',
                operator: 'LIKE',
                values: `%${query}%`
            }),
        ], "OR")
    ]);

    res.send(data);
});

router.get('/:id', async function (req, res, next) {
    let data = await AlbumModel.getById(db, req.params.id);

    res.send(data);
});

// Save
router.post('/:id', async function (req, res, next) {
    const obj = new Album(req.body);
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
