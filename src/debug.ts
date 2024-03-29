import {request} from 'https';
import * as Sentry from '@sentry/node';
import type {NodeClient} from '@sentry/node'
import FormData from 'form-data';
import config from '#/config';
import type {NodeOptions} from '@sentry/node/dist/types';

config().then(({SENTRY_DSN, NODE_ENV}) => {
    const config: NodeOptions = {
        dsn: null,
        enabled: false,
        maxBreadcrumbs: 0,
        environment: NODE_ENV,
    };

    if (SENTRY_DSN) {
        config.enabled = true;
        config.dsn = SENTRY_DSN;
    }

    Sentry.init(config);
});

/**
 *
 * @param attachments
 * @param event
 * @param client
 */
const attachAsJson = async (attachments: object[], event, client: NodeClient) => {
    const dsn = client.getDsn();
    if (!dsn) {
        return;
    }

    const {host, projectId, port, user} = dsn;
    const eventId = event.event_id;

    const formData = new FormData();
    for (const attachment of attachments) {
        formData.append(
            'application/json',
            JSON.stringify(attachment),
            'attachment',
        );
    }

    const req = request({
        method: 'POST',
        host,
        port,
        protocol: 'https:',
        path: `/api/${projectId}/events/${eventId}/attachments/?`
            + `sentry_key=${user}&sentry_version=7&sentry_client=custom-javascript`,
        headers: formData.getHeaders(),
    });
    req.on('error', console.error);
    formData.pipe(req);
    req.end();
};

/**
 *
 * @param e
 * @param context
 */
const capture = async (e: any, context?: {attachments: object[]}): Promise<void> => {
    const promise = new Promise(
        (resolve) => {
            Sentry.withScope((scope) => {
                if (context && context.attachments && context.attachments.length) {
                    scope.addEventProcessor(async (event) => {
                        try {
                            await attachAsJson(
                                context.attachments,
                                event,
                                Sentry.getCurrentHub().getClient(),
                            );
                        } catch (ex) {
                            console.error(ex);
                        }

                        return event;
                    });
                }

                Sentry.captureException(e);
                resolve(null);
            });
        },
    );

    await promise;
    await Sentry.flush();
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 25.03.2022
 * Time: 14:01
 */
export {
    capture,
};
