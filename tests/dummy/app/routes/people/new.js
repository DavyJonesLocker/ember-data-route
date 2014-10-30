import Ember from 'ember';
import DataRouteMixin from 'ember-data-route/mixins/data-route';

export default Ember.Route.extend(DataRouteMixin, {
  model: function() {
    var routeContext = this;
    return this.store.find('organization', 1).then(function(organization) {
      return routeContext.store.createRecord('person', { organization: organization });
    });
  }
});
