import { not, filterBy, alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('entry-status'),
  isArchived: DS.attr('boolean'),
  isEvaluation: DS.attr('boolean'),
  isPrivate: DS.attr('boolean'),
  draw: DS.attr('number'),
  seed: DS.attr('number'),
  prelim: DS.attr('number'),
  rank: DS.attr('number'),
  mos: DS.attr('number'),
  description: DS.attr('string'),
  directors: DS.attr('string', {defaultValue: ''}),
  representing: DS.attr('string', {defaultValue: ''}),
  musPoints: DS.attr('number'),
  perPoints: DS.attr('number'),
  sngPoints: DS.attr('number'),
  totPoints: DS.attr('number'),
  musScore: DS.attr('number'),
  perScore: DS.attr('number'),
  sngScore: DS.attr('number'),
  totScore: DS.attr('number'),
  session: DS.belongsTo('session', {async: true}),
  group: DS.belongsTo('group', {async: true}),
  competitor: DS.belongsTo('competitor', {async: true}),
  appearances: DS.hasMany('appearance', {async: true}),
  contestants: DS.hasMany('contestant', {async: true}),
  permissions: DS.attr(),
  logs: DS.attr(),

  build: memberAction({path: 'build', type: 'post'}),
  invite: memberAction({path: 'invite', type: 'post'}),
  withdraw: memberAction({path: 'withdraw', type: 'post'}),
  submit: memberAction({path: 'submit', type: 'post'}),
  approve: memberAction({path: 'approve', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  notArchived: not(
    'isArchived'
  ),

  includedContestants: filterBy(
    'contestants',
    'isIncluded'
  ),

  includedContestantsCount: alias(
    'includedContestants.length'
  ),

  statusOptions: [
    'New',
    'Invited',
    'Withdrawn',
    'Submitted',
    'Approved',
    'Scratched',
    'Disqualified',
  ],
  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.get('statusOptions').indexOf(this.get('status'));
    }
  ),
  allMembers: alias('group.members'),
  contestantCount: alias('contestants.length'),
  activeMembersCount: alias('group.activeMembers.length'),
  repertoryCount: alias('group.repertories.length'),
  conventionStatus: alias('session.convention.status')
});
