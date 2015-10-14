import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';
import { serialize } from '../helpers/json-api';

let App, server, oldConfirm;

const {
  get,
  run,
  $: E$
} = Ember;

module('Acceptance: DataRouteMixin new record', {
  setup() {
    App = startApp();
    server = new Pretender(function() {
      let people = serialize('people', []);
      let organization = serialize('organization', { id: 1 });

      this.get('/people', function() {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify(people)];
      });
      this.get('/organizations/1', function() {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify(organization)];
      });
    });
  },
  teardown() {
    run(App, 'destroy');
    server.shutdown();
  }
});

test('removes record from store', function(assert) {
  visit('/people');

  andThen(function() {
    assert.ok(E$('.names').text().match(/Fred Flinstone/) === null, '"Fred Flinstone" should not be found');
  });

  click('a');
  fillIn('input', 'Fred Flinstone');
  click('a');

  andThen(function() {
    assert.ok(E$('.names').text().match(/Fred Flinstone/) === null, '"Fred Flinstone" should not be found');

    let store = App.__container__.lookup('service:store');
    store.findRecord('organization', 1).then(function(organization) {
      assert.equal(Ember.isEmpty(get(organization, 'people')), true, 'Organization people should be empty');
    });
  });

});

module('Acceptance: DataRouteMixin existing record', {
  setup() {
    oldConfirm = window.confirm;
    App = startApp();
    server = new Pretender(function() {
      let people = [
        { id: 1, name: 'Barney Rubble' },
        { id: 2, name: 'Betty Rubble' }
      ];

      this.get('/people', function() {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify(serialize('people', people))];
      });

      this.get('/people/:id', function(request) {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify(serialize('people', people[request.params.id - 1]))];
      });
    });
  },
  teardown() {
    window.confirm = oldConfirm;
    run(App, 'destroy');
    server.shutdown();
  }
});

test('rolls back changes with confirm true', function(assert) {
  window.confirm = function() {
    return true;
  };
  visit('/people');

  andThen(function() {
    assert.ok(E$('.names').text().match(/Barney Rubble/) !== null, '"Barney Rubble" should have be found');
  });

  console.log('1');
  click('a.person-edit');

  console.log('2');
  fillIn('input', 'Fred Flinstone');
  console.log('3');
  click('a');

  andThen(function() {
    assert.ok(E$('.names').text().match(/Barney Rubble/) !== null, '"Barney Rubble" should have be found');
    assert.ok(E$('.names').text().match(/Fred Flinstone/) === null, '"Fred Flinstone" should not be found');
  });
});

test('does not transition with confirm false', function(assert) {
  window.confirm = function() {
    return false;
  };

  visit('/people');

  andThen(function() {
    assert.ok(E$('.names').text().match(/Barney Rubble/) !== null, '"Barney Rubble" should have be found');
    click('a.person-edit');
  });

  andThen(function() {
    fillIn('input', 'Fred Flinstone');
    click('a');
  });

  andThen(function() {
    assert.equal(currentPath(), 'people.edit');
  });
});

test('removes record from store when transitioning within the same route', function(assert) {
  window.confirm = function() {
    return true;
  };

  visit('/people/1/edit');
  andThen(function() {
    fillIn('input', 'Jackson');
  });

  visit('/people/2/edit');
  andThen(function() {
    fillIn('input', 'Cardarella');
  });

  visit('/people/1/edit');
  andThen(function() {
    assert.ok(E$('input.name').val().match(/Jackson/) === null, '"Jackson" should not be found');
  });
});
