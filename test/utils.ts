import {writeFileSync, rmSync, mkdirSync} from 'fs';

const TEMPLATE = {
    'name': 'artifacts',
    'schema': {
        '$$file': 'store',
        'crc': '',
    },
    'entries': [
        {
            '_id': 'rtf:54Rg1sFj9QbqI',
            '_ts': 0,
            '$$file': 'store\\foobar.map.json',
            'crc': '123abc',
        },
        {
            '_id': 'cached',
            '_ts': 0,
            '$$file': 'store\\foobar.map.json',
            'crc': '456def',
        },
    ],
    'timestamp': 1644014393621,
};

/**
 *
 */
export const create = () => {
    try {
        mkdirSync('./store');
        writeFileSync('./store/artifacts.json', JSON.stringify(TEMPLATE));
        writeFileSync('./store/foobar.map.json', JSON.stringify({foo: 'bar'}));
    } catch (e) {
        //
    }
};

/**
 *
 */
export const cleanup = () => {
    try {
        rmSync('./store', {
            recursive: true,
        });
    } catch (e) {
        //
    }
};
