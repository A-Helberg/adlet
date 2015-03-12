import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import DS from 'ember-data';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  ApplicationAdapter: DS.Adapter.extend({
    find: function (store, type, id){
      return {content:"ho",id: 1};
    }
  })
});

loadInitializers(App, config.modulePrefix);

export default App;
