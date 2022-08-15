import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class PlanetComponent extends Component {
  @service store;

  @tracked displayEditor = false;
  @tracked name = '';

  @dropTask
  *toggleEditor() {
    if (this.displayEditor) {
      let fork = this.store.fork();
      let moon = fork.cache.findRecord(this.args.moon);
      moon.name = this.name;
      yield this.store.merge(fork);
      fork.destroy();
    } else {
      this.name = this.args.moon.name;
    }

    this.displayEditor = !this.displayEditor;
  }

  @dropTask
  *remove(planet) {
    let fork = this.store.fork();
    yield fork.removeRecord(planet);
    yield this.store.merge(fork);
    fork.destroy();
  }
}