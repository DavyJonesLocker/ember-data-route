import DS from 'ember-data';

export default DS.Model.extend({
  people: DS.hasMany('person')
});