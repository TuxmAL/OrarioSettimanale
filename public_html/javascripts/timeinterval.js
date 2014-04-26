'use strict';

var TimeInterval = function(){
  var d = 0, h = 0, m = 0, s = 0, mill = 0;

  if (arguments.length === 1) {
	mill = arguments[0].valueOf();
  };
  if (arguments.length === 3) {
	h = arguments[0].valueOf();
	m = arguments[1].valueOf();
	s = arguments[2].valueOf();
  };
  if (arguments.length >= 4) {
	d = arguments[0].valueOf();
	h = arguments[1].valueOf();
	m = arguments[2].valueOf();
	s = arguments[3].valueOf();
  };
  if (arguments.length === 5) {
	mill = arguments[4].valueOf();
  };
 
  var t = (((d * 24 + h) * 60 + m) * 60 + s) * 1000 + mill;
  var obj = new Date(t);
  obj.TimeInterval = true;

  obj.add = function(t) {
	if (t.getTime) {
	  this.setTime(this.getTime() + t.getTime());
	};
	return this;
  };

  obj.subtract = function(t) {
	if (t.getTime) {
	  this.setTime(this.getTime() - t.getTime());
	};
	return this;
  };
 
  obj.equals = function(t){
	if (t.getTime) {
	  return this.getTime() === t.getTime();
	};
	return false;
  };

  obj.getDays = function(){
	return Math.floor(this.getTime() / 24 / 60 / 60 / 1000);
  };

  obj.getHours = function(){  
	return Math.floor(this.getTime() / 60 / 60 / 1000);
  };

  obj.toString = function(){
	return this.getHours() + ":" + ("0" + this.getUTCMinutes()).slice(-2);
  };

  return obj;
  };
