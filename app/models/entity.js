import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  name: attr('string'),
  status: attr('entity-status'),
  kind: attr('entity-kind'),
  age: attr('entity-age'),
  is_novice: attr('boolean'),
  start_date: attr('isodate'),
  end_date: attr('isodate'),
  location: attr('string'),
  website: attr('string'),
  facebook: attr('string'),
  twitter: attr('string'),
  email: attr('string'),
  phone: attr('string'),
  picture: attr('string'),
  description: attr('string'),
  code: attr('string'),
  short_name: attr('string'),
  long_name: attr('string'),
  lft: attr('number'),
  parent: belongsTo('entity', {inverse: 'children', async: true}),
  children: hasMany('entity', {inverse: 'parent', async: true}),
  awards: hasMany('award', {async: true}),
  // assignments: hasMany('assignment', {async: true}),
  // groups: hasMany('group', {async: true}),
  // performers: hasMany('performer', {inverse: 'representing', async: true}),
  // sessions: hasMany('session', {async: true}),
  // hosts: hasMany('host', {async: true}),
  permissions: attr(),
});