import Component from '@glimmer/component';
import { dropTask } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

let moonCount = 1;

export default class PlanetCreatorComponent extends Component {
  @service store;

  @tracked name = '';

  @dropTask
  *create(event) {
    event.preventDefault();

    // Create Planet
    let fork = this.store.fork();
    let planet = yield fork.addRecord({ type: 'planet', name: this.name });
    yield fork.addRecord({
      type: 'moon',
      planet: planet,
      name: `moon ${moonCount++}`,
    });
    yield fork.addRecord({
      type: 'moon',
      planet: planet,
      name: `moon ${moonCount++}`,
    });
    yield this.store.merge(fork);
    fork.destroy();

    // Reset the form
    this.name = '';
  }
}
