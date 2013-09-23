describe('Spec of GaTrackingTwEvent', function () {

  'use strict';

  var param, expectParam;

  beforeEach(function () {
    param = {
      click        : true,
      tweet        : true
    };
    expectParam = {
      click        : true,
      tweet        : true
    };
  });

  describe('Test for #initOpt...', function () {

    it('return boolean value you pass constructor', function () {

      var instance = new GaTrackingTwEvent({}),
          resultParam = instance.initOpt(param);

      expect(resultParam).to.eql(expectParam);

    });

    it('return false you pass constructor to undefined', function () {

      var instance = new GaTrackingTwEvent({}),
          resultParam;

      param.click = undefined;
      expectParam.click = false;
      resultParam = instance.initOpt(param);

      expect(resultParam).to.eql(expectParam);

    });

  });

  describe('Test for #makeEvnetList', function () {


    var expectList = [
      {label: 'click', eName: 'click'},
      {label: 'tweet', eName: 'tweet'}
    ];

    it('make event object if param is true', function () {

      var instance = new GaTrackingTwEvent({}),
          resultList = instance.makeEvnetList(param);

      expect(resultList).to.eql(expectList);

    });

    it('do not make event object if param is false', function () {

      var param = {
        click        : false,
        tweet        : false
      },
      instance = new GaTrackingTwEvent({}),
      resultList = instance.makeEvnetList(param);

      expect(resultList).to.eql([]);

    });
  });

  describe('Test for #hasGaSdk', function () {

    it('return true if ga object exist', function () {

      var instance = new GaTrackingTwEvent({});
      window.ga = {};

      expect(instance.hasGaSdk()).to.be.ok();
      window.ga = undefined;

    });

    it('return false if ga object exist', function () {

      var instance = new GaTrackingTwEvent({});
      expect(instance.hasGaSdk()).to.not.be.ok();

    });

  });

  describe('Test for #hasTwSdk', function () {

    it('return true if Twitter object exist', function () {

      var instance = new GaTrackingTwEvent({});
      window.twttr = {};

      expect(instance.hasTwSdk()).to.be.ok();
      window.twttr = undefined;

    });

    it('return false if Twitter object exist', function () {

      var instance = new GaTrackingTwEvent({});
      expect(instance.hasTwSdk()).to.not.be.ok();

    });

  });

  describe('Test for #subscribeAll', function () {

  });

});