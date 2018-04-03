import cfg from '../config';
import errors from '../errors';

/**
 * @property {Boolean} status
 * @property data
 */
export class Reply {
    constructor(status, data = null) {
        this.status = status;
        this.data = data;
    }
}

export class SuccessReply extends Reply {
    constructor(data = null) {
        super(true, data);
    }
}

export class ErrorReply extends Reply {
    constructor(data = null, err = null) {
        super(false, data);
        this.err = err;
    }

    omitError() {
        this.err = null;
    }
}

export class NotFoundReply extends ErrorReply {
    constructor() {
        super(errors.system.notFound);
    }
}

export class UnauthorizedReply extends ErrorReply {
    constructor() {
        super(errors.system.unauthorized);
    }
}

export function replyMiddleware(reply, res, next) {
    if (reply.reply instanceof Reply) {
        reply = reply.reply;
    }

    if (reply instanceof Reply) {

        if (reply instanceof ErrorReply) {
            if (!cfg.debug) {
                reply.omitError();
            }
        }

        res.send(reply);
    } else {
        res.send(new NotFoundReply());
    }
}