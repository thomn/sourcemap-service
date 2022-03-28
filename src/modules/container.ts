import type {Callables, Container} from '#/types';

const FN_SIGNATURE_REGEX = /^\(({?(.*?)}?)\)|(\w+)/;
const FN_BRACES = /^{(.*?)}$/;

/**
 *
 */
const factory = (): Container => {
    const dependency = new Map();

    /**
     *
     * @param callables
     */
    const resolve = (callables: Callables): unknown => {
        let [, match] = extract(callables);

        if (match === '') {
            return callables.apply(null);
        }

        if (FN_BRACES.test(match)) {
            [, match] = FN_BRACES.exec(match);

            const deps = match.split(',')
                .map(name => name.trim())
                .reduce((acc, key) => {
                    acc[key] = get(key);

                    return acc;
                }, {})
            ;

            return callables(deps);
        } else {
            const deps = match.split(',')
                .map(name => name.trim())
                .map(name => get(name))
            ;

            return callables(...deps);
        }
    };

    /**
     *
     * @param name
     */
    const get = <T>(name: string): T => (
        dependency.get(name)
    );

    /**
     *
     * @param name
     * @param value
     */
    const set = (name: string | number, value: object): void => {
        dependency.set(name, value);
    };

    /**
     *
     * @param fn
     */
    const extract = (fn: Callables): RegExpMatchArray => {
        return stringify(fn)
            .match(FN_SIGNATURE_REGEX)
        ;
    };

    /**
     *
     * @param fn
     */
    const stringify = (fn: Callables): string => (
        Function.prototype.toString.call(fn)
    );

    /**
     *
     */
    const context = (): Container => ({
        resolve,
        get,
        set,
    });

    return context();
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.08.2020
 * Time: 17:58
 */
export default factory;
