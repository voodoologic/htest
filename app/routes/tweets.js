import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend({
  subdomain: null,
  model: function() {
    return {
      tweets: [
        {
          user_name: 'Doug'
        }
      ]
    }
// export default Ember.Route.extend( InfinityRoute,  {
//   subdomain: null,
//   model: function() {
//     return {
//       tweets: [
//         {
//           user_name: 'Doug'
//         }
//       ]
//     }
    // return this.infinityModel('tweet', {"perPage": 50, "startingPage": 1});
    // if (params.hastag != null && params.user != null) {
    //   this.infinityModel('tweet', {
    //     "perPage": 50,
    //     "startingPage": 1,
    //     "hashtag": params.hashtag,
    //     "user": params.user,
    //     "subdomain": this.get('subdomain')
    //   });
    // } else if (params.hashtag != null) {
    //   this.infinityModel('tweet', {
    //     "perPage": 50,
    //     "startingPage": 1,
    //     "hashtag": params.hashtag,
    //     "subdomain": this.get('subdomain')
    //   });
    // } else if (params.user != null) {
    //   this.infinityModel('tweet', {
    //     "perPage": 50,
    //     "startingPage": 1,
    //     "user": params.user,
    //     "subdomain": this.get('subdomain')
    //   });
    // } else {
    //   this.infinityModel('tweet', {
    //     "perPage": 50,
    //     "startingPage": 1,
    //     "subdomain": this.get('subdomain')
    //   })
    // }

  }
});
