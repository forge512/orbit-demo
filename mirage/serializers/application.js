import { JSONAPISerializer } from 'ember-cli-mirage';
import { camelCase } from 'lodash/string';

export default JSONAPISerializer.extend({
  alwaysIncludeLinkageData: true,

  typeKeyForModel(model) {
    return camelCase(model.modelName);
  },

  keyForAttribute(attr) {
    return camelCase(attr);
  },

  keyForRelationship(rel) {
    return camelCase(rel);
  },
});
