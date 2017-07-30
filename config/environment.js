/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'htest',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    subdomainMapping: {
      '':null,
      'www': 'www'
    },
    torii: {
      providers: {
        'twitter': {
          appId: 'ehy2oJuRcw3SlUUFJL9CKg',
          requestTokenUri: 'http://lvh.me:3000/users/auth/twitter' /* we don't use this anymore :) */
        }
      }
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

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' 'http://api.hatora.de/' 'http://localhost:9292'",
      'font-src': "'self'",
      'connect-src': "'self' 'http://api.hatora.de/' 'ws://localhost:9292/faye' 'http://localhost:9292/faye'",
      'img-src': "'self' 'http://pbs.twimg.com/'",
      'report-uri':"'localhost'",
      'style-src': "'self' 'unsafe-inline'",
      'frame-src': "'none'"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.apiScheme = 'http://';
    ENV.apiHost   = 'lvh.me';
    ENV.apiPort   = ':3000';
    ENV.publisherUrl   = 'http://localhost:9292';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
