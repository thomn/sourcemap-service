import teda, {Format} from 'teda';
import type {Middleware} from '#/types';

/**
 *
 */
const factory = async (): Promise<Middleware> => {
    /**
     *
     * @param req
     */
    const skip = (req) => {
        const {url} = req;

        return [
            '/',
            '/favicon.ico',
        ].includes(url);
    };

    return teda(Format.DEFAULT, {
        skip,
    });
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.11.2021
 * Time: 12:57
 */
export default factory;
