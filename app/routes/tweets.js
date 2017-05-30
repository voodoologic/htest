import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend( InfinityRoute,  {
  subdomain: null,
  model: function(params) {
    if (params.hastag != null && params.user != null) {
      this.infinityModel('tweet', {
        "perPage": 50,
        "startingPage": 1,
        "hashtag": params.hashtag,
        "user": params.user,
        "subdomain": this.get('subdomain')
      });
    } else if (params.hashtag != null) {
      this.infinityModel('tweet', {
        "perPage": 50,
        "startingPage": 1,
        "hashtag": params.hashtag,
        "subdomain": this.get('subdomain')
      });
    } else if (params.user != null) {
      this.infinityModel('tweet', {
        "perPage": 50,
        "startingPage": 1,
        "user": params.user,
        "subdomain": this.get('subdomain')
      });
    } else {
      return [
          {
            screen_name: 'Doug',
            profile_image: 'http://placekitten.com/50/50',
            url: 'http://example.com',
            created_at: 'tuesday',
            text: 'herp derp',
            media_url: 'http://placekitten.com/50/50',
            tweetText: 'hello'
          }
        ]
    }

  }
});
