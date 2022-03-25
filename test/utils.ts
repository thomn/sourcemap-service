import {writeFileSync, rmdir, mkdirSync} from 'fs';

const TEMPLATE = {
    'name': 'artifacts',
    'schema': {
        '$$file': 'store',
        'crc': '',
        'size': 0,
        'context': '{}'
    },
    'entries': [
        {
            '_id': 'rtf:54Rg1sFj9QbqI',
            '_ts': 0,
            '$$file': 'store\\foobar.map.json',
            'crc': '123abc',
            'size': 1337,
            'context': {
                'version': 1,
            },
        },
        {
            '_id': 'cached',
            '_ts': 0,
            '$$file': 'store\\foobar.map.json',
            'crc': '456def',
            'size': 0,
            'context': {
                'version': 2,
            },
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
    return new Promise((resolve) => {
        rmdir('./store', {recursive: true}, resolve);
    });
};
