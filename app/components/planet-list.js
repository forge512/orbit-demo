import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency';
import { action } from '@ember/object';

export default class PlanetListComponent extends Component {
  @service store;
  @tracked staticPlanets = [];
  @tracked displayMoons = false;

  get planets() {
    return this.store.cache.liveQuery((q) => q.findRecords('planet'));
  }

  @action
  toggleMoons() {
    this.displayMoons = !this.displayMoons;
  }

  /* eslint require-yield: off */
  @dropTask
  *refresh() {
    let fork = this.store.fork();
    this.staticPlanets = fork.cache.findRecords('planet');
  }
}
