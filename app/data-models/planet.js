import { Model, attr, hasMany } from 'ember-orbit';

export default class Planet extends Model {
  @attr('string') name;

  @hasMany('moon', { inverse: 'planet' }) moons;
}
