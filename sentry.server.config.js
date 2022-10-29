import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
    dsn:
        SENTRY_DSN ||
        'https://98cb7f5b34e74b3884b878736b53e4b3@o1421618.ingest.sentry.io/6767546',
    tracesSampleRate: 1.0,
})
