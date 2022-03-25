import {set} from 'container';
import {parse} from 'url';
import {context} from 'modules';
import {capture} from 'debug';
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
                let payload = chunks.filter(Boolean)
                    .join('')
                ;

                if (req.headers && req.headers['content-type']) {
                    if (req.headers['content-type'] === 'application/json') {
                        try {
                            payload = JSON.parse(payload);
                        } catch (err) {
                            capture(err);
                            payload = null;
                        }
                    }
                }

                instance.update('payload', payload);
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
