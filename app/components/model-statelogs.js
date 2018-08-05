import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';

export default Component.extend({
  sortedStatelogsProperties: [
    'timestamp',
  ],
  sortedStatelogs: sort(
    'model.statelogs',
    'sortedStatelogsProperties'
  )
});
