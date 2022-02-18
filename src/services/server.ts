import {createServer, IncomingMessage, Server, ServerResponse} from 'http';
import {ReadStream, statSync} from 'fs';
import {Status} from 'status';
import {Return} from '../types';

const ContentType = {
    TEXT: 'text/plain',
    JSON: 'application/json; charset=utf-8',
    STREAM: 'application/octet-stream',
};

/**
 *
 * @param name
 * @param version
 */
const factory = (name: string, version: string) => {
    let server: Server;

    /**
     *
     * @param port
     */
    const listen = async (port: string | number) => (
        new Promise((resolve) => {
            server.listen(port, () => {
                console.info(`> ${name}:${version} listening on port ${port}`);

                resolve(context());
            });
        })
    );

    /**
     *
     */
    const close = async () => (
        new Promise((resolve, reject) => (
            server.close((err) => {
                if (err) {
                    return reject(err);
                }

                resolve(context());
            })
        ))
    );

    /**
     *
     * @param res
     * @param code
     * @param data
     */
    const send = (res: ServerResponse, code: number, data = null): void => {
        if (res.headersSent) {
            return;
        }

        let type = ContentType.TEXT;
        let length = (data && data.length) | 0;

        if (data == null) {
            //
        } else if (Buffer.isBuffer(data)) {
            type = ContentType.STREAM;
            length = data.length;
        } else if (data instanceof ReadStream) {
            const {size} = statSync(data.path);

            type = ContentType.STREAM;
            length = size;
        } else if (typeof data !== 'string') {
            data = JSON.stringify(data, null, 2);

            type = ContentType.JSON;
            length = Buffer.byteLength(data);
        }

        res.statusCode = code;
        res.setHeader('Content-Type', type);
        res.setHeader('Content-Length', length);

        if (data instanceof ReadStream) {
            data.pipe(res);
        } else {
            res.end(data);
        }
    };

    /**
     *
     * @param req
     * @param res
     * @param fn
     */
    const run = (req: IncomingMessage, res: ServerResponse, fn: (req: IncomingMessage, res: ServerResponse) => unknown) => {
        /**
         *
         * @param target
         */
        const onResolve = (target: Return | string) => {
            if (target != undefined) {
                if (typeof target === 'string') {
                    return send(res, Status.OK, target);
                }

                const {status, data} = target;

                return send(res, Status[status], data);
            }

            return send(res, Status.NOT_FOUND);
        };

        /**
         *
         * @param err
         */
        const onReject = (err) => {
            console.error(err);

            send(res, Status.INTERNAL_SERVER_ERROR);
        };

        return new Promise((resolve) => resolve(fn(req, res)))
            .then(onResolve)
            .catch(onReject)
        ;
    };

    /**
     *
     * @param fn
     */
    const serve = (fn:(req: IncomingMessage, res: ServerResponse) => unknown) => {
        /**
         *
         * @param req
         * @param res
         */
        const partial = (req, res) => (
            run(req, res, fn)
        );

        server = createServer(partial);

        return context();
    };

    /**
     *
     */
    const context = () => ({
        listen,
        serve,
        close,
        server,
    });

    return context();
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.11.2021
 * Time: 16:22
 */
export default factory;
