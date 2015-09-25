import Ember from 'ember';
import config from './config/environment';

let Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('people', function() {
    this.route('new');
    this.route('edit', { path: ':person_id/edit' });
  });
});

export default Router;
