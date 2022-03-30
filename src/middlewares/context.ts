import {parse} from 'url';
import {set} from '#/container';
import {context} from '#/modules';
import {capture} from '#/debug';
import type {Middleware} from '#/types';

/**
 *
 */
const factory = async (): Promise<Middleware> => {
    return (req, res, next) => {
        const {query} = parse(req.url, true);
        const instance = context();
        instance.update('query', query);

        return new Promise((resolve) => {
            let body = '';

            /**
             *
             * @param chunk
             */
            const onData = (chunk) => {
                body += chunk;
            };

            /**
             *
             */
            const onEnd = () => {
                let payload = null;

                if (req.headers && req.headers['content-type']) {
                    if (req.headers['content-type'] === 'application/json') {
                        try {
                            payload = JSON.parse(body);
                        } catch (err) {
                            capture(err, {
                                attachments: [{
                                    body,
                                    type: typeof body,
                                }],
                            });
                            payload = null;
                        }
                    }
                }

                instance.update('payload', payload);
                set('context', instance);

                resolve(next());
            };

            req.on('data', onData);
            req.on('end', onEnd);
        });
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.12.2021
 * Time: 15:28
 */
export default factory;
