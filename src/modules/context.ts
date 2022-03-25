import type {Context, State} from '../types';
import {Resource} from '../types';

/**
 *
 */
const factory = (): Context => {
    const context: State = {
        query: undefined,
        body: undefined,
        param: undefined,
    };

    /**
     *
     * @param resource
     * @param value
     */
    const update = (resource: Resource, value: any) => {
        context[resource] = value;
    };

    /**
     *
     * @param resource
     */
    const get = <T>(resource: Resource): T => {
        return context[resource];
    };

    return {
        update,
        get,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.02.2022
 * Time: 20:34
 */
export default factory;
