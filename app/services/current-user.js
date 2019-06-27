import Service, { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import RSVP from 'rsvp';

export default Service.extend({
  session: service(),
  store: service(),

  load() {
    let username = this.get('session.data.authenticated.profile.sub');
    if (!isEmpty(username)) {
      return this.store.query('user', {
        'username': username,
      }).then(users => {
        return users.get('firstObject');
      }).catch(err => {
        alert(err.errors[0].detail)
        return RSVP.resolve()
      }).then((user) => {
        return this.set('user', user);
      });
    } else {
      return RSVP.resolve();
    }
  }
});
