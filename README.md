# Tasky

A minimal Android App built on top of Angular Ionic and Firebase to illustrate it's features.

## Requirements
* NodeJS (v12.16.2)
* npm (v6.14.4)
* Ionic (v5.4.16)
* Cordova (v9.0.0)

## Installation

``npm install``

## Launch in browser emulator lab

``ionic serve -l``

## Build

Install Java JDK 8, Gradle and the Android SDK, accept it's licences. The best way would be to install Android Studio to manage this.

For Android you will also need the Android Debug Bridge Unility.

``ionic cordova platform add android``

``ionic cordova resources android``

``ionic cordova compile android`` to compile the .apk.

## Install .apk on a device

1. Turn on the Develpment Mode on the device and enable USB transfer
2. ``cd ANDROID_SDK_ROOT`` 
3. connect your Device with an USB cable
4. ``adb start-server``
5. ``adb devices``
6. ``adb install <path-to-project>\platforms\android\app\build\outputs\apk\debug\app-debug.apk``

In case the App does not work re-install the webview plugin.

``ionic cordova plugin rm cordova-plugin-ionic-webview``
``ionic cordova plugin add cordova-plugin-ionic-webview``
``rm -rf plugins``
``ionic cordova build android``

## Remote Debugging the Android Device App

In Chrome: 

1. go to ``chrome://inspect#devices``
2. once your device gets detected click on inspect
