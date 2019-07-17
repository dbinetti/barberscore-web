import { alias, not, filterBy, sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('session-status'),
  kind: DS.attr('session-kind'),
  numRounds: DS.attr('number'),
  isInvitational: DS.attr('boolean'),
  description: DS.attr('string'),
  notes: DS.attr('string'),
  footnotes: DS.attr('string'),
  legacyReport: DS.attr('string'),
  drcjReport: DS.attr('string'),

  owners: DS.hasMany('user', {async: true}),
  convention: DS.belongsTo('convention', {async: true}),
  target: DS.belongsTo('session', {async: true}),

  contests: DS.hasMany('contest', {async: true}),
  entries: DS.hasMany('entry', {async: true}),

  permissions: DS.attr(),
  rounds: DS.hasMany('round', {async: true}),

  reset: memberAction({path: 'reset', type: 'post'}),
  build: memberAction({path: 'build', type: 'post'}),
  open: memberAction({path: 'open', type: 'post'}),
  close: memberAction({path: 'close', type: 'post'}),
  verify: memberAction({path: 'verify', type: 'post'}),
  package: memberAction({path: 'package', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),

  legacy: memberAction({ path: 'legacy', type: 'get', ajaxOptions: { arraybuffer: true } }),
  drcj: memberAction({ path: 'drcj', type: 'get', ajaxOptions: { arraybuffer: true } }),


  isDisabled: not(
    'permissions.write'
  ),

  conventionStatus: alias('convention.status'),
  conventionIsActive: alias('convention.isActive'),
  conventionName: alias('convention.nomen'),

  notArchived: not('isArchived'),

  groupKindSort: alias('group.kindSort'),
  groupName: alias('convention.groupName'),

  statusOptions: [
    'New',
    'Built',
    'Opened',
    'Closed',
    'Verified',
    'Packaged',
    'Finished',
  ],
  kindOptions: [
    'Quartet',
    'Chorus',
    'Mixed',
    'Senior',
    'Youth',
    'Unknown',
    'VLQ',
  ],

  numOptions: [
    1,
    2,
    3,
  ],

  newEntries: filterBy(
    'entries',
    'status',
    'New'
  ),
  builtEntries: filterBy(
    'entries',
    'status',
    'Built'
  ),
  invitedEntries: filterBy(
    'entries',
    'status',
    'Invited'
  ),
  withdrawnEntries: filterBy(
    'entries',
    'status',
    'Withdrawn'
  ),
  submittedEntries: filterBy(
    'entries',
    'status',
    'Submitted'
  ),
  approvedEntries: filterBy(
    'entries',
    'status',
    'Approved'
  ),

  newEntriesCount: alias('newEntries.length'),
  builtEntriesCount: alias('builtEntries.length'),
  invitedEntriesCount: alias('invitedEntries.length'),
  withdrawnEntriesCount: alias('withdrawnEntries.length'),
  submittedEntriesCount: alias('submittedEntries.length'),
  approvedEntriesCount: alias('approvedEntries.length'),
  totalEntriesCount: alias('entries.length'),
  contestCount: alias('contests.length'),

  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.statusOptions.indexOf(this.status);
    }
  ),

  kindSort: computed(
    'kind',
    'kindOptions',
    function() {
      return this.kindOptions.indexOf(this.kind);
    }
  ),

  currentAppearancesSort: [
    'num',
  ],
  currentAppearances: sort(
    'current.appearances',
    'currentAppearancesSort'
  ),
});
