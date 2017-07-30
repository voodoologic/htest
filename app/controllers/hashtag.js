import Ember from 'ember';

export default Ember.Controller.extend({
  hashtag: "",
  filtered_tweets: Ember.computed('tweet.@each.hashtags', 'target', function() {
    if( this.get('hashtag') == '') {
      this.get('tweets');
    } else {
      this.get('tweets').filterBy('hashtag', this.get('target'));
    }
  })
});
