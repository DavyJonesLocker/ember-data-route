import Ember from 'ember';

const {
  get,
  Mixin
} = Ember;

export default Mixin.create({
  primaryModel: 'model',
  resetController() {
    let primaryModel = get(this, 'primaryModel');
    let model = get(this, `controller.${primaryModel}`);

    if (!get(model, 'isDeleted')) {
      model.rollbackAttributes();
    }
  },
  actions: {
    willTransition(transition) {
      let primaryModel = get(this, 'primaryModel');
      let model = get(this, `controller.${primaryModel}`);

      if (get(model, 'hasDirtyAttributes') && !this.willTransitionConfirm(transition)) {
        transition.abort();
      }
    }
  },
  willTransitionConfirm() {
    return true;
  }
});
