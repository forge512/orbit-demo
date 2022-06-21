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

  @action
  destroyFork() {
    this.fork.destroy();
  }

  @action
  createFork() {
    this.fork = this.store.fork();
    this.requery();
  }

  @action
  requery() {
    this.staticPlanets = this.fork.cache.findRecords('planet');
  }

  @dropTask
  *rebase() {
    let oldFork = this.fork;
    let newFork = this.store.fork();
    yield newFork.merge(oldFork);
    this.fork = newFork;
    yield oldFork.destroy();

    // This would fix the issue as it updates references to the new fork
    // this.staticPlanets = this.fork.cache.findRecords('planet');
  }

  @dropTask
  *reload() {
    yield this.store.findRecords('planet', { include: ['moons'] });
  }
}
