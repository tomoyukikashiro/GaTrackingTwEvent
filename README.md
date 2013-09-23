# GaTrackingTwEvent

[![Build Status](https://travis-ci.org/kashiro/GaTrackingTwEvent.png?branch=master)](https://travis-ci.org/kashiro/GaTrackingTwEvent)

Utility Class of tracking some Facebook events by using Google Analyitcs

## Outline

This script enable to track some Facebook event such as like, unlike, add comment, remove comment and send message.

## Initialize

```javascript
  var gaTwEvent = new GoolgeAnalyticsTwEvent({
    click         : true, // when set false, do not track
    tweet         : true,
    callback      : function(res){
      // callback fire when these event was called.
    }
  });
  // subscribe Twitter event to tracking by Google Analytics
  gaTwEvent.subscribe();
```

## Usage

load Twitter SDK asynchronously

```html

<!-- load this script -->
<script src="./GoolgeAnalyticsTwEvent.js"></script>

<script>
window.twttr = (function (d,s,id) {
  var t, js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
  js.src="https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
  return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
}(document, "script", "twitter-wjs"));

// Wait for the asynchronous resources to load
twttr.ready(function () {
  var gaTwEvent = new GaTrackingTwEvent({
    click    : true, // when set false, do not track
    tweet    : true,
    callback : function(res){
      // callback fire when these event was called.
    }
  });
  // subscribe Twitter event to tracking by Google Analytics
  gaTwEvent.subscribe();
});
</script>

```

## Check on Google Analytics

1. access to Google Analytics
2. `Traffic Sources -> Social -> Plugins -> URL -> Social Source and Action`

![Google Analytics Screenshot](https://raw.github.com/kashiro/GaTrackingTwEvent/master/resources/screenshot.png)

## Notice

* This script support Universal Analytics (analytics.js)
