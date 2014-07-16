import Ember from 'ember';
import DataRouteMixin from 'dummy/mixins/data-route';

export default Ember.Route.extend(DataRouteMixin, {
  model: function() {
    return this.store.createRecord('person');
  }
});
