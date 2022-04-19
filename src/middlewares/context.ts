import {parse} from 'url';
import {set} from '#/container';
import {context} from '#/modules';
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
            const chunks = [];

            /**
             *
             * @param chunk
             */
            const onData = (chunk) => {
                chunks.push(chunk);
            };

            /**
             *
             */
            const onEnd = () => {
                const payload = Buffer.concat(chunks)
                    .toString('utf-8')
                ;

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
