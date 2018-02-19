import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service('current-user'),
  model: function() {
    return this.get('store').query('group', {
      'officers__person__user': this.get('currentUser.user.id'),
      'page_size': 100,
    });
  },
});
