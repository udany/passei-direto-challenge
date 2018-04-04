import path from 'path';
import fs from 'fs';
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

    if (obj.id && obj.tempImage) {
        // Delete current image
        const current = path.resolve('./static/data/collection', obj.id+'_'+obj.imageSeed);

        if (fs.existsSync(current)) {
            fs.unlinkSync(current);
        }

        // Get data on new image
        const source = path.resolve('./static/data/temp', obj.tempImage);

        let stat = fs.statSync(source);

        // Update info
        obj.imageSeed = Math.floor(stat.mtime.getTime()/1000);
        obj.hasImage = true;

        // Move new image
        const destination = path.resolve('./static/data/collection', obj.id+'_'+obj.imageSeed);
        fs.renameSync(source, destination);


        await CollectionModel.save(db, obj, ['imageSeed', 'hasImage']);

        obj.tempImage = '';
    }

    res.send(obj);
});

router.delete('/:id', async function (req, res, next) {
    let data = await CollectionModel.deleteById(db, req.params.id);

    res.send(new Reply(data));
});

module.exports.path = '/collection';
module.exports.router = router;
