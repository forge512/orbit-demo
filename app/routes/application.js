import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service dataCoordinator;
  @service store;

  model() {
    return this.store.findRecords('planet', { include: ['moons'] });
  }

  async beforeModel() {
    // Populate the store from backup prior to activating the coordinator
    // As users browse more data this way of loading the store would
    // become a performance problem. It also creates a weird data loading
    // pardigm where sometimes there is data in the store and sometimes not.
    // It would be better to try the remote store, then on failure fallback to
    // the backup.
    // const backup = this.dataCoordinator.getSource('backup');
    // const records = await backup.query((q) => q.findRecords());
    // await this.store.sync((t) => records.map((r) => t.addRecord(r)));

    await this.dataCoordinator.activate();
  }
}
