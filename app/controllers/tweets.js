import Ember from 'ember';

export default Ember.Controller.extend({
  "queryParams":{
    "hashtags": {
      "refereshModel": true
    },
    "user": {
      "refereshModel": true
    },
    "hashtag": null,
    "user": null,
    // "filteredTweets": Ember.computed("hashtag", "model", function(){
    //   // var hashtag = this.get('hashtag')
    //   let tweet   = this.get('model')
    // })
  }
});
