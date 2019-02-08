const morgan = require('morgan');

/**
 *
 * @param format
 * @return {function(*=): Function}
 */
const factory = (format) => {
    const logger = morgan(format);

    return (next) => ({req, res, ...rest}) => {
        logger(req, res, () => next({req, res, ...rest}));
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 08.02.2019
 * Time: 11:53
 */
module.exports = factory;
