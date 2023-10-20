/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  module.exports,
  {
    silent: true,
    org: 'test-uzl',
    project: 'javascript-nextjs',
  },
  {
    widenClientFileUpload: true,

    transpileClientSDK: true,

    tunnelRoute: '/monitoring',

    hideSourceMaps: true,

    disableLogger: true,
  }
);
