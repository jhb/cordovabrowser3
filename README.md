Cordova Browser 3
=================

A port of Evan Shapiro's Cordova Browser to cordova 3.3 to the 3.x API. 

This app for android allows loading of apps from a server, while allowing 
full access to the cordova API. This makes development and debugging much faster. 

The app keeps the screen running, I found that this makes debugging using weinre easier.

For the original which is for version 2.9 check:

- https://play.google.com/store/apps/details?id=com.eas.cordova.browser
- https://github.com/es92/CordovaBrowser/

To use:

    cd platforms/android
    android update project --subprojects -p .
    cd -
    cordova build

A binary (apk) can be found here: https://baach.de/Members/jhb/cordova-browser-3-apk/view    
