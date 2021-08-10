import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency';

export default class PlanetListComponent extends Component {
  @service store;
  @tracked staticPlanets = [];

  get planets() {
    return this.store.cache.liveQuery((q) => q.findRecords('planet'));
  }

  @dropTask
  *refresh() {
    this.staticPlanets = this.store.cache.findRecords('planet');
  }

  @dropTask
  *remove(planet) {
    let fork = this.store.fork();
    yield fork.removeRecord(planet);
    yield this.store.merge(fork);
    fork.destroy();
  }
}
