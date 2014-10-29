import Ember from 'ember';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server, oldConfirm;

module('Acceptance: DataRouteMixin new record', {
  setup: function() {
    App = startApp();
    server = new Pretender(function() {
      this.get('/people', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({people: []})];
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('removes record from store', function() {
  visit('/people');

  andThen(function() {
    ok(Ember.$('.names').text().match(/Fred Flinstone/) === null, '"Fred Flinstone" should not be found');

    click('a');

    andThen(function() {
      fillIn('input', 'Fred Flinstone');
      click('a');
      andThen(function() {
        ok(Ember.$('.names').text().match(/Fred Flinstone/) === null, '"Fred Flinstone" should not be found');
      });
    });
  });
});

module('Acceptance: DataRouteMixin existing record', {
  setup: function() {
    oldConfirm = window.confirm;
    App = startApp();
    server = new Pretender(function() {
      var people = [
        { id: 1, name: "Barney Rubble" },
        { id: 2, name: "Betty Rubble"}
      ];
      this.get('/people', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({people: people})];
      });

      this.get('/people/:id', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({ person: people[request.params.id - 1]} )];
      });
    });
  },
  teardown: function() {
    window.confirm = oldConfirm;
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('rolls back changes with confirm true', function() {
  window.confirm = function() {
    return true;
  };
  visit('/people');

  andThen(function() {
    ok(Ember.$('.names').text().match(/Barney Rubble/) !== null, '"Barney Rubble" should have be found');

    click('a.person-edit');

    andThen(function() {
      fillIn('input', 'Fred Flinstone');
      click('a');
      andThen(function() {
        ok(Ember.$('.names').text().match(/Barney Rubble/) !== null, '"Barney Rubble" should have be found');
        ok(Ember.$('.names').text().match(/Fred Flinstone/) === null, '"Fred Flinstone" should not be found');
      });
    });
  });
});

test('does not transition with confirm false', function() {
  window.confirm = function() {
    return false;
  };
  visit('/people');

  andThen(function() {
    ok(Ember.$('.names').text().match(/Barney Rubble/) !== null, '"Barney Rubble" should have be found');

    click('a.person-edit');

    andThen(function() {
      fillIn('input', 'Fred Flinstone');
      click('a');
      andThen(function() {
        equal(currentPath(), "people.edit");
      });
    });
  });
});

test('removes record from store when transitioning within the same route', function() {
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
    ok(Ember.$('input.name').val().match(/Jackson/) === null, '"Jackson" should not be found');
  });
});
