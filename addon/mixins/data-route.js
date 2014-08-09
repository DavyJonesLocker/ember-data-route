import Ember from 'ember';

export default Ember.Mixin.create({
  deactivate: function() {
    var model = this.get('controller.model');
    model.rollback();
    if (model.get('isNew')) {
      model.deleteRecord();
    }
  },
  actions: {
    willTransition: function(transition) {
      var model = this.get('controller.model');
      if (model.get('isDirty') && !this.willTransitionConfirm(transition)) {
        transition.abort();
      }
    }
  },
  willTransitionConfirm: function(transition) {
    /*jshint unused:false*/
    return true;
  }
});
