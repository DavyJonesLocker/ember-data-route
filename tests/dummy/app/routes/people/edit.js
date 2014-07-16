import Ember from 'ember';
import DataRouteMixin from 'dummy/mixins/data-route';

export default Ember.Route.extend(DataRouteMixin, {
  willTransitionConfirm: function() {
    return window.confirm("Go?");
  }
});
