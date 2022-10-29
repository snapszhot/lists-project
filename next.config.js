const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    sentry: {
        hideSourceMaps: true,
    },
}

const sentryWebpackPluginOptions = {
    silent: true,
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
