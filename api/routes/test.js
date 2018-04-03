import express from 'express';
import CollectionModel from "../models/CollectionModel";

let router = express.Router();

router.get('/', async function (req, res, next) {


    res.send(CollectionModel.getCreateStatement());
});

module.exports.path = '/test';
module.exports.router = router;
