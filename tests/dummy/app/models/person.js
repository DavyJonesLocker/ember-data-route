import DS from 'ember-data';

const {
  Model,
  belongsTo,
  attr
} = DS;

export default Model.extend({
  organization: belongsTo('organization'),
  name: attr('string')
});
