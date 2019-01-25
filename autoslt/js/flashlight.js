// ************************************************************************
// * File Name: flashlight.js
// * Description: mmitest -> test item: Flashlight.
// * Note:
// ************************************************************************

/* global TestItem */
'use strict';

function $(id) {
  return document.getElementById(id);
}

var Flashlight = new TestItem();
Flashlight.onInit = function() {
  $('retestButton').addEventListener('click', this);
  this.startTest();
};

Flashlight._flashlightManager = null;

Flashlight.startTest = function() {
  $('retestButton').style.visibility = 'hidden';
  this.passButton.disabled = 'disabled';
  this.failButton.disabled = 'disabled';
  var self = this;
  navigator.getFlashlightManager().then(FlashlightManager => {
    FlashlightManager.flashlightEnabled = true;
    self._flashlightManager = FlashlightManager;
  });
  window.setTimeout(this.timeOutCallback.bind(this), 500);
};

Flashlight.timeOutCallback = function() {
  $('retestButton').style.visibility = 'visible';
  this.passButton.disabled = '';
  this.failButton.disabled = '';
};

Flashlight.onHandleEvent = function(evt) {
  evt.preventDefault();
  switch (evt.type) {
    case 'click':
      switch (evt.target) {
        case $('retestButton'):
          this.startTest();
          break;
      }
      break;
  }
  return false;
};

Flashlight.onDeinit = function() {
  if (this._flashlightManager) {
    this._flashlightManager.flashlightEnabled = !this._flashlightManager.flashlightEnabled;
  }
};

window.addEventListener('load', Flashlight.init.bind(Flashlight));
window.addEventListener('beforeunload', Flashlight.uninit.bind(Flashlight));
window.addEventListener('keydown', Flashlight.handleKeydown.bind(Flashlight));
