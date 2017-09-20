import fetch from 'fetch';
import Ember from 'ember';
import config from '../config/environment';


export default Ember.Service.extend({
  debug: false,
  debugMessage(message) {
    console.log(message)
  },
  init() {
    this._super()
    this.set('subscriptions', {})
  },
  server: config.publisherUrl,
  mount: '/faye',
  reset() {
    this.set('connectiong', false)
    this.set('fayeClient', null)
    this.set('fayeCallbacks', [])
    this.set('subscriptions', {})
    this.set('server', null)
    this.set('disables', [])
    this.set('connectionSettings',
      {
        timeout: 120,
        retry: 5,
        endpoints: {}
      }
    )
  },
  faye(self) {
    self.get('fayeClient') || self.connectToFaye(self)
    self.get('fayeClient').disable('long-polling')
    return self.get('fayeClient')
  },
  fayeExtension(self) {
    return {
      incoming(message, callback) { callback(message) },
      outgoing(message, callback) {
        if(!message.ext){ message.ext = {} }
        if (message.channel == '/meta/subscribe') {
          message.ext.danthes_signature = self.get(`subscriptions.${message.subscription.slice(1)}.opts.signatures`)
          message.ext.danthes_timestamp = self.get(`subscriptions.${message.subscription.slice(1)}.opts.timestamp`)
        } else {
          message.ext.danthes_token =  '588d158962940ed4c022ae44526889ee809343fea3cc47b5ce159940cf4c110d0f769517fc7b622c'
          callback(message)
        }
      }
    }
  },
  connectToFaye(self) {
    self.set('fayeClient', new Faye.Client(self.get('server') + self.get('mount')));
    self.get('fayeClient').addExtension(self.get('fayeExtension')(self));
  },
  sign(options) {
    this.get('debugMessage')('sign into faye')
    this.get('server') || this.set('server', options.server)
    this.get('subscriptions') || this.set('subscriptions', {})
    let channel = options.channel
    if (!this.get('subscription.channel')) {
      this.set(`subscriptions.${channel}`, {})
      this.set(`subscriptions.${channel}.callback`, options.callback)
      this.get('activeChannel')( channel, this )//.then(function(data){ console.log('hello') })
    }
  },
  activeChannel(channel, self){
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (self.get(`subscription.${channel}.activated`)){
        return true
      }
      self.request_token().then((data) => {
        console.log(data)
        self.set(`subscriptions.${channel}.opts`, {})
        self.set(`subscriptions.${channel}.opts.signature`, data[channel].signature)
        self.set(`subscriptions.${channel}.opts.timestamp`, data[channel].timestamp)
        self.get('faye')(self).subscribe(`/${channel}`, function() {
          self.handleResponse(message, channel)
        })
        resolve(data);
      }, function(reason) { console.log(reason)})
    })
  },

  request_token() {
    return fetch(config.apiScheme + config.apiHost + config.apiPort + '/api/v1/data').then(function(response){ return response.json(); })
  },
  handleResponse(message, channel){
    console.log(message);
  }
});
