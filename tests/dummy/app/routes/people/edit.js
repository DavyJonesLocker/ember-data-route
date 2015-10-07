import Ember from 'ember';
import DataRoute from 'ember-data-route';

export default Ember.Route.extend(DataRoute, {
  willTransitionConfirm() {
    return window.confirm('Go?');
  }
});
