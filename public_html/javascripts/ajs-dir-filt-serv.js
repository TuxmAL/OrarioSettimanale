'use strict';

/* Filters */
angular.module('OrarioSett.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]).
  filter('pad' , function(){
    return function(value, padding){
      var pad_string = "";
      for (var i = 0; i < padding ; i++) {
        pad_string = '0'.concat(pad_string);
      }
      return (angular.isDefined(value) && (value !== null) && !isNaN(value))? (pad_string.concat(value)).slice(-2): '-';
   };
});

/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('OrarioSett.services', []).
  value('version', '1.1');

/* Directives */
angular.module('OrarioSett.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
  
// Declare app level module which depends on filters, and services
angular.module('OrarioSett', [
  'ui.bootstrap',
  'OrarioSett.filters',
  'OrarioSett.services',
  'OrarioSett.directives',
  'OrarioSett.ngtimesel'
]);
