import Ember from 'ember';
import { module, test } from 'qunit';
import DataRouteMixin from 'ember-data-route/mixins/data-route';

module('DataRouteMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var DataRouteObject = Ember.Object.extend(DataRouteMixin);
  var subject = DataRouteObject.create();
  assert.ok(subject);
});
