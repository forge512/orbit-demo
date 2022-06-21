import SourceClass from '@orbit/jsonapi';
import { buildInflector } from '@orbit/serializers';
import { pluralize, singularize } from 'ember-inflector';
import config from 'orbit-demo/config/environment';

export default {
  create(injections = {}) {
    injections.name = 'remote';
    injections.host = config.APP.apiHost;
    injections.namespace = config.APP.orbit.apiNamespace;
    injections.serializerSettingsFor = (/* type */) => {
      return {
        inflectors: {
          pluralize: buildInflector({}, pluralize),
          singularize: buildInflector({}, singularize),
        },
      };
    };

    return new SourceClass(injections);
  },
};
