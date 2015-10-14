import Ember from 'ember';

const {
  get,
  Mixin
} = Ember;

export default Mixin.create({
  resetController() {
    let model = get(this, 'controller.model');

    if (!get(model, 'isDeleted')) {
      model.rollbackAttributes();
    }
  },
  actions: {
    willTransition(transition) {
      let model = get(this, 'controller.model');

      if (get(model, 'hasDirtyAttributes') && !this.willTransitionConfirm(transition)) {
        transition.abort();
      }
    }
  },
  willTransitionConfirm() {
    return true;
  }
});
