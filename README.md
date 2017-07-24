# Ember Data Route [![Build](https://travis-ci.org/dockyard/ember-data-route.svg?branch=master)](https://travis-ci.org/dockyard/ember-data-route)

**[ember-data-route is built and maintained by DockYard, contact us for expert Ember.js consulting](https://dockyard.com/ember-consulting)**.

## About ##

Ensure you clean up after your models.

Any routes you deactivate will check the `model` to ensure it is not
unsaved. If it is it will either rollback or remove the model from the
store depending if has been previously persisted.

## Install ##

```bash
npm install ember-data-route --save-dev
```

## Usage ##

Add the mixin to any route you want:

```js
import Ember from 'ember';
import DataRoute from 'ember-data-route';

export default Ember.Route.extend(DataRoute, {
  ...
});
```

### Transition Confirmation ###

By default when you transition out of the route the data model is
rolled-back/removed automatically after the router is deactivated.
However, you may want to detect if this is going to happen and alert the
user of changes that will be lost. Typically you could use
`window.confirm` to allow the user to decide to proceed or not. In the
route you are mixing into you can provide your own
`willTransitionConfirm` function to handle this. By default this
function returns `true` and is passed the `transition` object as an
argument for you to handle. One possible override could be:

```js
export default Ember.Route.extend(DataRouteMixin, {
  willTransitionConfirm: function() {
    return window.confirm("You have unsaved changes that will be lost. Do you want to continue?");
  }
});
```

## Authors ##

* [Brian Cardarella](http://twitter.com/bcardarella)

[We are very thankful for the many contributors](https://github.com/dockyard/ember-data-route/graphs/contributors)

## Versioning ##

This library follows [Semantic Versioning](http://semver.org)

## Want to help? ##

Please do! We are always looking to improve this gem. Please see our
[Contribution Guidelines](https://github.com/dockyard/ember-data-route/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal ##

[DockYard](http://dockyard.com/ember-consulting), Inc &copy; 2014

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
