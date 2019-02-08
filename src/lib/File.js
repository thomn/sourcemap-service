const {createReadStream: read, unlinkSync: unlink, writeFileSync: write} = require('fs');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 06.02.2019
 * Time: 09:30
 */
class File {

    /**
     *
     * @param path
     */
    constructor(path) {
        this._path = path;
    }

    /**
     *
     * @return {boolean}
     */
    unlink() {
        const {_path: path} = this;

        try {
            unlink(path)
        } catch (e) {
            return false;
        }

        return true;
    }

    /**
     *
     * @return {*}
     */
    read() {
        const {_path: path} = this;

        return read(path);
    }

    /**
     *
     * @param buffer
     * @return {boolean}
     */
    write(buffer) {
        const {_path: path} = this;

        try {
            write(path, buffer, 'utf8');
        } catch (e) {
            return false;
        }

        return true;
    }
}

module.exports = File;
