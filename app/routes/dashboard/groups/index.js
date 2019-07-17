import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  model() {
    return this.store.query('group', {
      'owners': this.currentUser.user.id,
      'status': 10,
      'kind__gt': 21,
    });
  },
});
