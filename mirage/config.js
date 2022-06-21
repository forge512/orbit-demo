import config from 'orbit-demo/config/environment';

export default function () {
  // The jsonapi data source for Orbit JS is stricter about Content-Type
  // than ember-data.
  this.pretender.prepareHeaders = function (headers) {
    headers['Content-Type'] = 'application/vnd.api+json';
    return headers;
  };

  if (config.environment === 'development') {
    this.logging = true;
  }

  this.namespace = `/${config.APP.orbit.apiNamespace}`;

  this.resource('planet');
  this.resource('moon');
}
