import Ember from 'ember';
import DataRoute from 'ember-data-route';

const { Route } = Ember;

export default Route.extend(DataRoute, {
  willTransitionConfirm() {
    return window.confirm('Go?');
  }
});
