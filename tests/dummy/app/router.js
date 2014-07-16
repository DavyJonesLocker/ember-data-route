import Ember from 'ember';

var Router = Ember.Router.extend({
  location: DummyENV.locationType
});

Router.map(function() {
  this.resource('people', function() {
    this.route('new');
    this.route('edit', {path: ':person_id/edit'});
  });
});

export default Router;
