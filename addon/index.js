import Ember from 'ember';

const {
  Mixin,
  get
} = Ember;

export default Mixin.create({
  resetController() {
    const model = get(this, 'controller.model');

    if (!get(model, 'isDeleted')) {
      model.rollbackAttributes();
    }
  },

  willTransitionConfirm(transition) {
    /*jshint unused:false*/
    return true;
  },

  actions: {
    willTransition(transition) {
      const model = get(this, 'controller.model');

      if (get(model, 'hasDirtyAttributes') && !this.willTransitionConfirm(transition)) {
        transition.abort();
      }
    }
  }
});
