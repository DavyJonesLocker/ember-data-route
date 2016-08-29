import Ember from 'ember';
import DataRouteMixin from 'ember-data-route';

const { Route } = Ember;

export default Route.extend(DataRouteMixin, {
  model() {
    return this.store.findRecord('organization', 1).then((organization) => {
      return this.store.createRecord('person', { organization });
    });
  }
});
