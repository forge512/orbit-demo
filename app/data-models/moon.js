import { Model, attr, hasOne } from 'ember-orbit';

export default class Moon extends Model {
  @attr('string') name;

  @hasOne('planet', { inverse: 'moons' }) planet;
}
