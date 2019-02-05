const {readdirSync: read, statSync: stat, mkdirSync: mkdir} = require('fs');
const {resolve} = require('path');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.02.2019
 * Time: 12:42
 */
class Cache {

    /**
     *
     */
    constructor(path) {
        this._cache = {};
        this._path = path;
    }

    /**
     *
     * @param version
     * @param name
     * @return {*}
     */
    get(version, name) {
        const {_cache: cache} = this;
        const {files, path} = cache[version] || {};

        if (!files) {
            return null;
        }

        const file = files.find(file => file === name);

        if (!file) {
            return null;
        }

        return resolve(path, file);
    }

    /**
     *
     * @param version
     * @param name
     */
    add(version, name) {
        const {_cache: cache, _path: path} = this;

        if (!cache[version]) {
            cache[version] = {
                files: [],
                path: resolve(path, version)
            };
        }

        cache[version].files.push(name);

        return this;
    }

    /**
     *
     * @param version
     * @param name
     * @return {boolean}
     */
    exists(version, name) {
        const {_cache: cache} = this;
        const {files} = cache[version] || {};

        if (!files) {
            return false;
        }

       return !!files.find(file => file === name);
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
     * @return {Cache}
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

module.exports = Cache;
