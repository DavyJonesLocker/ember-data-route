import Ember from 'ember';
import DataRouteMixin from 'ember-data-route/mixins/data-route';

export default Ember.Route.extend(DataRouteMixin, {
  willTransitionConfirm: function() {
    return window.confirm("Go?");
  }
});
