import * as Sentry from '@sentry/node';
import config from '#/config';

config().then(({SENTRY_DSN}) => {
    const config = {
        dsn: null,
        enabled: false,
        maxBreadcrumbs: 0,
    };

    if (SENTRY_DSN) {
        config.enabled = true;
        config.dsn = SENTRY_DSN;
    }

    Sentry.init(config);
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
