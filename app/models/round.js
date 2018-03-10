import { computed } from '@ember/object';
import { alias, not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('round-status'),
  kind: DS.attr('round-kind'),
  num: DS.attr('number'),
  session: DS.belongsTo('session', {async: true}),
  appearances: DS.hasMany('appearance', {async: true}),
  panelists: DS.hasMany('panelist', {async: true}),
  grids: DS.hasMany('grid', {async: true}),
  permissions: DS.attr(),

  verify: memberAction({path: 'verify', type: 'post'}),
  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  announce: memberAction({path: 'announce', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  conventionStatus: alias('session.convention.status'),
  conventionIsActive: alias('session.convention.isActive'),
  statusOptions: [
    'New',
    'Drawn',
    'Validated',
    'Started',
    'Finished',
    'Announced',
  ],
  kindOptions: [
    'Finals',
    'Semi-Finals',
    'Quarter-Finals',
  ],
  kindSort: computed(
    'kind',
    'kindOptions',
    function() {
      return this.get('kindOptions').indexOf(this.get('kind'));
    }
  ),
  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.get('statusOptions').indexOf(this.get('status'));
    }
  ),
  sessionConventionStartDate: alias('session.convention.startDate'),
  sessionKindSort: alias('session.kindSort'),
});
