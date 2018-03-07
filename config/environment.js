'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'barberscore-web',
    environment,
    rootURL: '/',
    locationType: 'auto',
    moment: {
      outputFormat: 'LL',
      allowEmpty: true // default: false
    },
    storeConfigInMeta: true,
    sentry: {
      dsn: 'https://4a9abb7157544f1b959cc120975c8a81@sentry.io/296102',
      development: environment === 'development',
    },
    contentSecurityPolicy: {
      'font-src': [
        'data:',
        '*.auth0.com',
      ].join(' '),
      'style-src': [
        "'unsafe-inline'",
      ].join(' '),
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'cdn.ravenjs.com',
        'localhost:4200',
        '*.auth0.com',
      ].join(' '),
      'report-uri': [
        'https://sentry.io/api/296102/csp-report/?sentry_key=4a9abb7157544f1b959cc120975c8a81'
      ].join(' '),
      'img-src': [
        'data:',
        '*.getsentry.com',
        '*.gravatar.com',
        '*.wp.com',
        '*.auth0.com',
      ].join(' '),
      'connect-src': [
        "'self'",
        'localhost:4200',
        '*.auth0.com',
        '*.getsentry.com',
      ].join(' ')
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    'ember-algolia': {
      algoliaId: 'GUKTE9MYCG',
      algoliaKey: '9f41231c00e4a5b47e1832103fa5c98e',
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = false;
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_TRANSITIONS = false;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.API_HOST = process.env.API_HOST;
    ENV.APP.API_NAMESPACE = process.env.API_NAMESPACE;
    ENV['ember-simple-auth'] = {
      authenticationRoute: 'login',
      routeAfterAuthentication: 'dashboard',
      routeIfAlreadyAuthenticated: 'dashboard',
      auth0: {
        clientID: process.env.AUTH0_CLIENT_ID,
        domain: process.env.AUTH0_DOMAIN,
      }
    };
  }

  if (environment === 'test') {
    ENV.locationType = 'none';
    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.API_HOST = '';
    ENV.APP.API_NAMESPACE = '';
    ENV['ember-simple-auth'] = {};
  }

  if (environment === 'production') {
    ENV.APP.API_HOST = process.env.API_HOST;
    ENV.APP.API_NAMESPACE = process.env.API_NAMESPACE;
    ENV['ember-simple-auth'] = {
      authenticationRoute: 'login',
      routeAfterAuthentication: 'dashboard',
      routeIfAlreadyAuthenticated: 'dashboard',
      auth0: {
        clientID: process.env.AUTH0_CLIENT_ID,
        domain: process.env.AUTH0_DOMAIN,
      }
    };
  }
  return ENV;
};
