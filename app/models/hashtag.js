import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr(),
  tweet: DS.belongsTo('tweet'),
  tweets: DS.hasMany("tweet")
});
