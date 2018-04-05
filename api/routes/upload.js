import express from 'express';
import path from 'path';
import fileUpload from 'express-fileupload';

import {ErrorReply, SuccessReply} from "../base/Reply";
import errors from "../errors";
import {HasUniqueId} from "../../shared/base/General";

let router = express.Router();

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

router.post('/', async function (req, res, next) {
    if (req.files.file) {
        const f = req.files.file;

        const id = (new HasUniqueId()).GetUId();
        const destination = path.resolve('./static/data/temp', id);

        await req.files.file.mv(destination);

        res.send(new SuccessReply(id));
    } else {
        res.send(new ErrorReply(errors.general.invalidData));
    }
});

module.exports.path = '/upload';
module.exports.router = router;
