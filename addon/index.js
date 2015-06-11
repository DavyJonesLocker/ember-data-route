import Ember from 'ember';

const get = Ember.get;
const {
  Mixin
} = Ember;

export default Mixin.create({
  resetController() {
    let model = get(this, 'controller.model');

    if(!get(model, 'isDeleted')) {
      if (get(model, 'isNew')) {
        model.deleteRecord();
      } else {
        model.rollback();
      }
    }
  },
  actions: {
    willTransition(transition) {
      let model = get(this, 'controller.model');

      if (get(model, 'isDirty') && !this.willTransitionConfirm(transition)) {
        transition.abort();
      }
    }
  },
  willTransitionConfirm(transition) {
    /*jshint unused:false*/
    return true;
  }
});
