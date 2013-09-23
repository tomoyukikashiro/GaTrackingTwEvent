/**
 * @class GaTrackingTwEvent
 * @description
 *   utility Class of tracking some Twitter events by using Google Analyitcs
 *
 * @example
 *
 *    var gaTrackingTwEvent = new GaTrackingTwEvent({
 *     click    : true,
 *     tweet    : true,
 *     callback : function(res){
 *       // your exellent function
 *     }
 *    });
 *    gaTrackingTwEvent.subscribe();
 *
 * @version 0.1.0
 * @author Tomoyuki Kashiro <kashiro@github>
 * @license MIT
 */
(function(exports){

  'use strict';

  /** event map */
  var eventMap = {
    click : 'click',
    tweet : 'tweet'
  };

  /**
   * @constructor
   * @param {Object} [args] option of this class.
   * Boolean value which event will track by Google Analytics.
   * @param {Boolean} args.click
   * @param {Boolean} args.tweet
   * @param {Function} args.callback fire these event was called.
   */
  var GaTrackingTwEvent = function(args){
    this.opt = this.initOpt(args);
    this.eventList = this.makeEvnetList(this.opt);
    this.cb = args.callback;
  };

  /**
   * prototype
   */
  GaTrackingTwEvent.prototype = {

    /**
     * initialize parameter (e.g. set default value)
     * @param {Object} [args] arguments of constructor
     * @return {Object} configuration object
     */
    initOpt: function(args){
      var param = args || {},
          opt = {
          click : !!param.click,
          tweet : !!param.tweet
        };
      return opt;
    },

    /**
     * make object which is used subscribe Twitter event
     * @param  {Object} [opt] configuration object
     * @return {Array}
     */
    makeEvnetList: function(opt){
      var list = [],
          key;

      for(key in opt){
        if(opt[key]){
          list.push({label: key, eName: eventMap[key]});
        }
      }
      return list;
    },

    /**
     * subscribe Twitter event.
     * If Twitter and Google Analytics SDKs are not exist
     * this function is not called.
     */
    subscribe: function(){
      if(this.hasSdk()){
        this.subscribeAll();
      }
    },

    /**
     * return wether Twitter and Google Analyitcs SDKs are exist or not
     * @return {Boolean} result of it
     */
    hasSdk: function(){
      return this.hasGaSdk() && this.hasTwSdk();
    },

    /**
     * return wether Google Analyitcs SDK are exist or not
     * @return {Boolean} result of it
     */
    hasGaSdk: function(){
      var res = !!ga;
      if(!res){
        console.error('There is not google analytics sdk.');
      }
      return res;
    },

    /**
     * return wether twitter SDK are exist or not
     * @return {Boolean} result of it
     */
    hasTwSdk: function(){
      var res = !!twttr;
      if(!res){
        console.error('There is not twitter sdk.');
      }
      return res;
    },

    /**
     * subscribe Twitter event which you set constructor parameter
     * @param {Boolean} isRemove whether FB events are remove or not
     */
    subscribeAll: function(){
      var me = this,
          list = this.eventList,
          l = list.length,
          i = 0;

      for(; i < l; i++){
        me.subscribeTw(list[i]);
      }
    },

    /**
     * unsubscribe Twitter event which you set constructor parameter
     */
    subscribeTw: function(eventOpt){
      var me = this;
      twttr.events.bind(eventOpt.eName, function(res){
        me.onTwEvent(eventOpt.label, res);
      });
    },

    /**
     * call Google Analyitcs tracking and callback
     * @param  {String} label Google Analytics tracking label
     * @param  {[type]} res   callback parameter of Twitter event
     * @see http://bit.ly/pdDFYX
     */
    onTwEvent: function(label, res){
      var url = location.href;
      ga('send', 'social', 'twitter', label, url);
      if(this.cb){
        this.cb(res);
      }
    }

  };

  /*--------------------------------
   * export
   --------------------------------*/
  exports.GaTrackingTwEvent = GaTrackingTwEvent;

}(window));
