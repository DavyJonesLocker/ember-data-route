import Ember from 'ember';
import DataRouteMixin from 'ember-data-route/mixins/data-route';

module('DataRouteMixin');

// Replace this with your real tests.
test('it works', function() {
  var DataRouteObject = Ember.Object.extend(DataRouteMixin);
  var subject = DataRouteObject.create();
  ok(subject);
});
