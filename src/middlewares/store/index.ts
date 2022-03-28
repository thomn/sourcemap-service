import {normalize} from 'path';
import vano from 'vano';
import {file} from '#/modules';
import {set} from '#/container';
import adapter from './adapter';
import type {Middleware} from '#/types';
import type {Artifact} from '#/types/collections';

export const FILE_KEY = '$$file';

/**
 *
 * @param directory
 */
const factory = async (directory: string): Promise<Middleware> => {
    directory = normalize(directory);

    const schema: Artifact = {
        [FILE_KEY]: file(directory),
        crc: '',
        context: {},
        size: 0,
    };

    const instance = vano({
        adapter: adapter(directory),
    });

    const artifacts = instance.collection('artifacts', schema);
    await artifacts.read();

    set('artifacts', artifacts);

    return (req, res, next) => {
        return next();
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.11.2021
 * Time: 21:28
 */
export default factory;
