/**
 * @type {import('next').NextConfig}
 */
const serverConfig = require('../server.config');
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: serverConfig.ANALYZE || process.env.ANALYZE === 'true',
    openAnalyzer: serverConfig.openAnalyzer});
const path = require('path');

const nextConfig = {
    basePath: '',
    reactStrictMode: true,
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    webpack(config, {isServer, buildId, webpack}) {
        config.plugins.unshift(new webpack.IgnorePlugin({resourceRegExp: /server\.config/}));
        return config;
    },
    // i18n: {
    //     // These are all the locales you want to support in
    //     // your application
    //     locales: ['en', 'he'],
    //     // This is the default locale you want to be used when visiting
    //     // a non-locale prefixed path e.g. `/hello`
    //     defaultLocale: 'he',
    //     // This is a list of locale domains and the default locale they
    //     // should handle (these are only required when setting up domain routing)
    //     // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    //     // domains: [
    //     //   {
    //     //     domain: 'example.com',
    //     //     defaultLocale: 'en-US',
    //     //   },
    //     //   {
    //     //     domain: 'example.nl',
    //     //     defaultLocale: 'nl-NL',
    //     //   },
    //     //   {
    //     //     domain: 'example.fr',
    //     //     defaultLocale: 'fr',
    //     //     // an optional http field can also be used to test
    //     //     // locale domains locally with http instead of https
    //     //     http: true,
    //     //   },
    //     // ],
    //   },
};
module.exports = withBundleAnalyzer(nextConfig);