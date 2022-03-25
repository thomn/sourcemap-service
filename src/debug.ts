import * as Sentry from '@sentry/node';
import config from 'config';

config().then(({SENTRY_DSN}) => {
    Sentry.init({
        dsn: SENTRY_DSN,
        maxBreadcrumbs: 0,
    });
});

/**
 *
 * @param exception
 * @param context
 */
const capture = (exception: any, context?: any) => {
    Sentry.captureException(exception, context);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 25.03.2022
 * Time: 14:01
 */
export {
    capture,
};
