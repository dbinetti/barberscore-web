import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  status: attr('host-status'),
  convention: belongsTo('convention', {async: true}),
  organization: belongsTo('organization', {async: true}),
  permissions: attr(),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],

});
