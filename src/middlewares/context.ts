import {set} from 'container';
import {parse} from 'url';
import {context} from 'services';
import type {Middleware} from 'types';

/**
 *
 */
const factory = async (): Promise<Middleware> => {
    return (req, res, next) => {
        const {query} = parse(req.url, true);
        const instance = context();
        instance.update('query', query);

        return new Promise((resolve) => {
            const chunks = [];

            /**
             *
             */
            const onReadable = () => {
                chunks.push(req.read());
            };

            /**
             *
             */
            const onEnd = () => {
                let body = chunks.filter(Boolean)
                    .join('')
                ;

                if (req.headers && req.headers['content-type']) {
                    if (req.headers['content-type'] === 'application/json') {
                        body = JSON.parse(body);
                    }
                }

                instance.update('body', body);
                set('context', instance);

                resolve(next());
            };

            req.on('readable', onReadable);
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
