/* eslint-env node */
import Ember from 'ember';

export default Ember.Controller.extend({
  danthes: Ember.inject.service(),
  notify: Ember.inject.service(),
  actions:{
    authenticateWithTwitter: function(){
    },
    logOut: function(){
    },
    ping: function(){
    }
  },
  init(args){
    const notification = this.get('notify')
    this.get('danthes').sign(
      {
        channel: 'messages',
        callback() {
          new Ember.RSVP.Promise( function(resolve, reject) {
            resolve(message)
          }).then(function(message) {
            console.log(message);
            notification.info(message)
          })
        }
      }
    );
    this.get('danthes').sign(
      {
        channel: 'notifications',
        callback() {
          new Ember.RSVP.Promise( function(resolve, reject) {
            resolve(message)
          }).then(function(message) {
            notification.info(message)
          })
        }
      }
    )
    this._super(args);
  },
  actions: {
    authenticateWithTwitter: () => {
      this.get('session').authenticate('authenticator:torii', 'dougtwitter', this.get('subdomain'))
      .then(function() {
        this.get('session').authorize('authorizer:twitter');
        route.transitionTo('index');
      })
    },
    logOut: () => {
      this.get('session').invalidate('authenticator:torii').then(
        () => { route.transitionTo('index')  }
      )
    },
    ping: () => {
      this.get('danthes.fayeClient').client.publish( '/commands', {
        command: 'restart_and_search',
        restart_and_search: $('input.stream-input').val()
      })
    },
    commitStreamChange: () => {
      this.get('danthes.fayeClient').client.publish( '/commands', {
        command: "restart_and_search",
        restart_and_search: $('input.stream-input').val()
      })
    }
  }
});
