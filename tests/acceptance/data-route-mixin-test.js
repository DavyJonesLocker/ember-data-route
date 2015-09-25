import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

let App, server, oldConfirm;

const {
  isEmpty,
  run
} = Ember;

module('Acceptance: DataRouteMixin new record', {
  setup() {
    App = startApp();
    server = new Pretender(function() {
      this.get('/people', () => {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ people: [] })];
      });
      this.get('/organizations/1', () => {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ organization: { id: 1 } })];
      });
    });
  },

  teardown() {
    run(App, 'destroy');
    server.shutdown();
  }
});

test('removes record from store', (assert) => {
  visit('/people');

  andThen(() => {
    assert.ok(Ember.$('.names').text().match(/Fred Flinstone/) === null, '"Fred Flinstone" should not be found');
  });

  click('a');
  fillIn('input', 'Fred Flinstone');
  click('a');

  andThen(() => {
    assert.ok(Ember.$('.names').text().match(/Fred Flinstone/) === null, '"Fred Flinstone" should not be found');

    const store = App.__container__.lookup('store:main');
    store.find('organization', 1).then((organization) => {
      assert.equal(isEmpty(organization.get('people')), true, 'Organization people should be empty');
    });
  });

});

module('Acceptance: DataRouteMixin existing record', {
  setup() {
    oldConfirm = window.confirm;
    App = startApp();
    server = new Pretender(function() {
      const people = [
        { id: 1, name: 'Barney Rubble' },
        { id: 2, name: 'Betty Rubble' }
      ];
      this.get('/people', () => {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ people })];
      });

      this.get('/people/:id', (request) => {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ person: people[request.params.id - 1] })];
      });
    });
  },

  teardown() {
    window.confirm = oldConfirm;
    run(App, 'destroy');
    server.shutdown();
  }
});

test('rolls back changes with confirm true', (assert) => {
  window.confirm = () => {
    return true;
  };
  visit('/people');

  andThen(() => {
    assert.ok(Ember.$('.names').text().match(/Barney Rubble/) !== null, '"Barney Rubble" should have be found');
  });

  click('a.person-edit');

  fillIn('input', 'Fred Flinstone');
  click('a');

  andThen(() => {
    assert.ok(Ember.$('.names').text().match(/Barney Rubble/) !== null, '"Barney Rubble" should have be found');
    assert.ok(Ember.$('.names').text().match(/Fred Flinstone/) === null, '"Fred Flinstone" should not be found');
  });
});

test('does not transition with confirm false', (assert) => {
  window.confirm = () => {
    return false;
  };

  visit('/people');

  andThen(() => {
    assert.ok(Ember.$('.names').text().match(/Barney Rubble/) !== null, '"Barney Rubble" should have be found');
    click('a.person-edit');
  });

  andThen(() => {
    fillIn('input', 'Fred Flinstone');
    click('a');
  });

  andThen(() => {
    assert.equal(currentPath(), 'people.edit');
  });
});

test('removes record from store when transitioning within the same route', (assert) => {
  window.confirm = () => {
    return true;
  };

  visit('/people/1/edit');
  andThen(() => {
    fillIn('input', 'Jackson');
  });

  visit('/people/2/edit');
  andThen(() => {
    fillIn('input', 'Cardarella');
  });

  visit('/people/1/edit');
  andThen(() => {
    assert.ok(Ember.$('input.name').val().match(/Jackson/) === null, '"Jackson" should not be found');
  });
});
