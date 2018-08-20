import Ember from 'ember';
import DataRouteMixin from 'ember-data-route';

const { RSVP, Route } = Ember;

export default Route.extend(DataRouteMixin, {
  primaryModel: 'person',

  model() {
    return RSVP.hash({
      organization: this.store.findRecord('organization', 1)
    });
  },

  setupController(controller, resolved) {
    resolved.person = this.store.createRecord('person', {
      organization: resolved.organization
    });

    controller.setProperties(resolved);
  }
});
