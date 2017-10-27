import {
  not,
  filterBy,
  alias,
  mapBy,
  sum
} from '@ember/object/computed';
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
  directors: DS.attr('string', {defaultValue: ''}),
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
  appearances: DS.hasMany('appearance', {async: true}),
  contestants: DS.hasMany('contestant', {async: true}),
  participants: DS.hasMany('participant', {async: true}),
  permissions: DS.attr(),
  logs: DS.attr(),

  invite: memberAction({path: 'invite', type: 'post'}),
  withdraw: memberAction({path: 'withdraw', type: 'post'}),
  submit: memberAction({path: 'submit', type: 'post'}),
  approve: memberAction({path: 'approve', type: 'post'}),
  scratch: memberAction({path: 'scratch', type: 'post'}),
  complete: memberAction({path: 'complete', type: 'post'}),

  notArchived: not(
    'isArchived'
  ),

  expiringMembers: filterBy(
    'participants',
    'isExpiring'
  ),

  expiringMembersCount: alias(
    'expiringMembers.length'
  ),


  statusOptions: [
    'New',
    'Invited',
    'Withdrawn',
    'Submitted',
    'Approved',
    'Scratched',
    'Final',
    'Disqualified',
  ],


  contestantCount: alias('contestants.length'),
  participantCount: alias('participants.length'),
  repertoryCount: alias('group.repertories.length'),
  tp: mapBy(
    'appearances',
    'totPoints'
  ),
  tc: mapBy(
    'appearances',
    'stc'
  ),
  totPointsCP: sum(
    'tp'
  ),
  stc: sum(
    'tc'
  ),
  totScoreCP: computed(
    'totPoints',
    'stc',
    function() {
      return (this.get('totPoints') / this.get('stc')).toFixed(1);
    }
  ),
  mp: mapBy(
    'appearances',
    'musPoints'
  ),
  mc: mapBy(
    'appearances',
    'smc'
  ),
  musPointsCP: sum(
    'mp'
  ),
  smc: sum(
    'mc'
  ),
  musScoreCP: computed(
    'musPoints',
    'smc',
    function() {
      return (this.get('musPoints') / this.get('smc')).toFixed(1);
    }
  ),
  pp: mapBy(
    'appearances',
    'perPoints'
  ),
  pc: mapBy(
    'appearances',
    'spc'
  ),
  perPointsCP: sum(
    'pp'
  ),
  spc: sum(
    'pc'
  ),
  perScoreCP: computed(
    'perPoints',
    'spc',
    function() {
      return (this.get('perPoints') / this.get('spc')).toFixed(1);
    }
  ),
  sp: mapBy(
    'appearances',
    'sngPoints'
  ),
  sc: mapBy(
    'appearances',
    'ssc'
  ),
  sngPointsCP: sum(
    'sp'
  ),
  ssc: sum(
    'sc'
  ),
  sngScoreCP: computed(
    'sngPoints',
    'ssc',
    function() {
      return (this.get('sngPoints') / this.get('ssc')).toFixed(1);
    }
  ),
  totRank: computed(
    'session.ranks.@each.{score,rank}',
    'totPoints',
    function() {
      return this.get('session.ranks').findBy('score', this.get('totPoints')).rank || null;
    }
  ),
  contestsArray: computed(
    'contestants.@each.contest', function() {
      return this.get('contestants');
  }),
  membersArray: computed(
    'participants.@each.member', function() {
      return this.get('participants');
  }),
  selectedContests: mapBy(
    'contestsArray',
    'contest.id'
  ),
  selectedMembers: mapBy(
    'membersArray',
    'member.id'
  ),
});
