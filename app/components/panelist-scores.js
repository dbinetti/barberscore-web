import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  store: service(),
  sortedScoresProperties: [
    'songNum',
  ],
  scoresCall: computed(
    'model',
    'appearance',
    function() {
      return this.get('store').query('score', {
        'panelist': this.get('model.id'),
        'song__appearance': this.get('appearance.id'),
        'page_size': 100
    });
  }),
  sortedScores: sort(
    'scoresCall',
    'sortedScoresProperties'
  ),
  autosave: task(function* (property){
    yield timeout(200);
    try {
      yield property.save();
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }).restartable(),
});