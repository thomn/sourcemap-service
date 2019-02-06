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
     */
    unlink() {
        const {_path: path} = this;

        unlink(path);
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
     */
    write(buffer) {
        const {_path: path} = this;

        write(path, buffer, 'utf8');
    }
}

module.exports = File;
