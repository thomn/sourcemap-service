import {container} from '#/modules';
import type {Context, Resolvable} from '#/types';

const {get, set, resolve} = container();

/**
 *
 * @param fn
 */
const factory: Resolvable = (fn) => {
    return (req, res, param) => {
        const context = get<Context>('context');
        context.update('param', param);

        return resolve(fn);
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.12.2021
 * Time: 12:41
 */
export default factory;
export {
    get,
    set,
};
