import Ember from 'ember';
import DataRoute from 'ember-data-route';

export default Ember.Route.extend(DataRoute, {
  willTransitionConfirm: function() {
    return window.confirm("Go?");
  }
});
