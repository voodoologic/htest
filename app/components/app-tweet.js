import Ember from 'ember';

export default Ember.Component.extend({
  // tweet: null,
  init: function(){
    this._super();
    // this.makeTokens();
  },
  tweetTextTokens: [],
  serializedEntities: [],
  sortedEntities: function(){
    this.serializedEntities.sort(this.compareIndeicies)
  },
  currentIndex: 0,
  currentKey: "",
  currentText: null,
  makeTokens: function(){
    this.tweetTextTokens = [];
    this.serializedEntities = [];
    this.generateTokens();
    this.createTokens();
  },
  generateTokens: function() {
    return ['hashtags', 'user_mentions', 'urls'].forEach(this.normalizeEntity.bind(this))
  },
  createTokens: function(){
    this.sortedEntities().forEach(this.pushToEndResult.bind(this))
    if (this.currentIndex < this.get('tweet.text').length){
      this.pushToken(this.currentText);
    }
    this.currentText = null
  },
  pushToEndResult: function(entity, index){
    var _currentText = this.currentText || this.get('tweet.text')
    var priorText = unicodeStringUtils.substring(_currentText, 0, entity.indices[0] - this.currentIndex)
    this.pushToken(prior_token)
    this.pushToken(entity)
    trailingText = unicodeStringUtils.substring(this.get('tweet.text'), entity.indices[1], unicodeStringUtils.length(this.get('tweet.text')))
    this.currentText = trailingText
    this.currentIndex = entity.indices[1]
  },
  pushToken: function(token) {
    this.tweetTextTokens.push(token)
  },
  convertToToken: function(text) {
    return {
      text: text,
      type: 'text'
    }
  },
  convertHashtagEntityToToken: function(entity) { },
  compareIndicies: function(a, b) {
    a.indices[0] - b.indices[0]
  },
  normalizeEntity: function(hash_key, index, keys){
    this.currentKey = hash_key
    this.get('tweet.entities')[hash_key].forEach(this.processEntityKeyValues.bind(this))
  },
  processEntityKeyValues: function(entity_value, index, value_entities) {
   thisinvertKey(entity_value)
  },
  invertKey: function(entity) {
    switch (this.currentKey){
      case 'hashtags':
        entity['isHashtag'] = true
        entity['urlText'] = entity['text']
        entity['text'] = "#" + entity['text']
        this.serializedEntities.push(entity)
        break;
      case 'user_mentions':
        entity['isUser'] = true
        entity['text'] = "@" + entity['screen_name']
        entity['urlText'] = entity['screen_name']
        this.serializedEntities.push(entity)
        break;
      case 'urls':
        entity['text'] = entity['display_url']
        entity['isUrl'] = true
        this.serializedEntities.push(entity)
        break;
    }
  }
});
