const File = require('./File');
const {readdirSync: read, statSync: stat, mkdirSync: mkdir} = require('fs');
const {resolve} = require('path');

/**
 *
 * @param version
 * @param name
 * @return {string}
 */
const getStoreKey = (version, name) => `${version}:${name}`;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.02.2019
 * Time: 12:42
 */
class Store {

    /**
     *
     */
    constructor(path) {
        this._store = {};
        this._path = path;
    }

    /**
     *
     * @param version
     * @param name
     * @return {*}
     */
    get(version, name) {
        const {_store: store} = this;
        const key = getStoreKey(version, name);

        return store[key];
    }

    /**
     *
     * @param version
     * @param name
     */
    add(version, name) {
        const {_store: store, _path: path} = this;
        const key = getStoreKey(version, name);
        const cursor = resolve(path, version, name);

        store[key] = new File(cursor);

        return this;
    }

    /**
     *
     * @param version
     * @param name
     * @return {boolean}
     */
    has(version, name) {
        const {_store: store} = this;
        const key = getStoreKey(version, name);

        return !!store[key];
    }

    /**
     *
     * @param version
     * @param name
     * @return {*}
     */
    create(version, name) {
        const {_path: path} = this;
        const directory = resolve(path, version);

        try {
            stat(directory);
        } catch (e) {
            mkdir(directory);
        }

        return this
            .add(version, name)
            .get(version, name)
        ;
    }

    /**
     *
     * @param version
     * @param name
     * @return {Store}
     */
    delete(version, name) {
        const key = getStoreKey(version, name);
        delete this._store[key];

        return this;
    }

    /**
     *
     * @return {Store}
     */
    initialise() {
        const {_path: path} = this;

        const map = (version) => {
            const cursor = resolve(path, version);
            const stats = stat(cursor);
            const add = (name) => this.add(version, name);

            if (stats.isDirectory()) {
                read(cursor).map(add);
            }
        };

        read(path)
            .map(map)
        ;

        return this;
    }
}

module.exports = Store;
