import {Adapter, file as adapter} from 'vano';
import {file} from 'modules';
import {FILE_KEY} from './index';

/**
 *
 * @param directory
 */
const factory = (directory: string): Adapter => {
    const {read, write} = adapter(directory);

    /**
     *
     * @param key
     * @param value
     */
    const reviver = (key: string, value: any): any => {
        if (key === FILE_KEY) {
            value = file(value);
        }

        return value;
    };

    /**
     *
     * @param key
     * @param value
     */
    const replacer = (key: string, value: any): any => {
        if (key === FILE_KEY) {
            value = value.toString();
        }

        return value;
    };

    /**
     *
     * @param data
     */
    const deserialize = (data: string): object => (
        data && JSON.parse(data, reviver)
    );

    /**
     *
     * @param data
     */
    const serialize = (data: object): string => (
        data && JSON.stringify(data, replacer)
    );

    return {
        read,
        write,
        deserialize,
        serialize,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 20.01.2022
 * Time: 20:14
 */
export default factory;
