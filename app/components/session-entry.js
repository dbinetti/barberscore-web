import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  membersCollapsed: true,
  officersCollapsed: true,
  repertoriesCollapsed: true,
  logsCollapsed: true,
  autosave: task(function* (property, value){
    this.model.set(property, value);
    yield timeout(1000);
    try {
      yield this.model.save();
      this.flashMessages.success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
  sortedEntriesProperties: [
    'groupName',
  ],
  sortedEntries: sort(
    'model.session.entries',
    'sortedEntriesProperties',
  ),
});
