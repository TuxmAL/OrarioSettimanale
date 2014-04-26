/* 
    http://www.whatibroke.com/?p=899
    Modified to remove AM/PM selector and to permit hours to reach 999!
*/

var app = angular.module('OrarioSett.ngtimesel', []);
  
app.directive("ngTimeSelector", function () {
    return {
        restrict: 'EA',
        template: '<div class="timeSelectorDirective"><div class="section hours"><div class="increase" ng-click="increaseHours()"><i class="icon-caret-up"></i></div><div class="display"><input class="span1 text-center" style="padding-top:2px;" type="text" maxlength="3" ng-mousewheel="incrementHours()" ng-change="updateHours()" ng-model="hours" /></div><div class="decrease" ng-click="decreaseHours()"><i class="icon-caret-down"></i></div class="display"></div><div class="section"><div class="upper">&nbsp;</div><div class="display">:</div><div class="lower">&nbsp;</div></div><div class="section minutes"><div class="increase" ng-click="increaseMinutes()"><i class="icon-caret-up"></i></div><div class="display"><input class="span1 text-center" style="padding-top:2px;" type="text" maxlength="2" ng-mousewheel="decreaseMinutes()" ng-change="updateMinutes()" ng-model="minutes" /></div><div class="decrease" ng-click="decreaseMinutes()"><i class="icon-caret-down"></i></div></div></div>',
        require:'?^ngModel',
        scope: {},
        replace: true,
        link: function (scope, elem, attr, ngModel) {
            if ( !ngModel ) {
                return; // do nothing if no ng-model
             }
            var selected = new TimeInterval();
            // Input elements
            var inputs = elem.find('input'), hoursInputEl = inputs.eq(0), minutesInputEl = inputs.eq(1);

            function pad(value, padding) {
              var ret_val;
			  if (angular.isDefined(value) && value.toString().length < padding) {
				
                ret_val = (Array(padding).join("0") + value).substr(-padding);
              } else {    
                ret_val = value;				
              }
			  return ret_val;
            }

            // Get scope.hours in 24H mode if valid
            function getHoursFromTemplate() {
              var hours = parseInt(scope.hours, 10);
              return (hours >= 0 && hours <= 999)? hours: undefined;
            };
            
            function getMinutesFromTemplate() {
              var minutes = parseInt(scope.minutes, 10);
              return ( minutes >= 0 && minutes < 60 ) ? minutes : undefined;
            };

            var invalidate = function(invalidHours, invalidMinutes) {
              ngModel.$setViewValue( null );
              ngModel.$setValidity('time', false);
              if (angular.isDefined(invalidHours)) {
                scope.invalidHours = invalidHours;
              }
              if (angular.isDefined(invalidMinutes)) {
                scope.invalidMinutes = invalidMinutes;
              }
            };

            scope.updateHours = function() {
              var hours = getHoursFromTemplate();
	 
              if (angular.isDefined(hours)) {
			    var minutes = getMinutesFromTemplate();
				minutes = angular.isDefined(minutes)? minutes: 0;
                //selected.setHours( hours );
				selected = new TimeInterval(hours, minutes, 0);
                refresh( 'h' );
              } else {
                invalidate(true);
              }
            };

            hoursInputEl.bind('blur', function(e) {
              if ( !scope.validHours && scope.hours < 999) {
                scope.$apply( function() {
                  scope.hours = pad(scope.hours, 3);
                });
              }
            });

            scope.updateMinutes = function() {
                var minutes = getMinutesFromTemplate();

                if ( angular.isDefined(minutes) ) {
                  selected.setMinutes( minutes );
                  refresh( 'm' );
                } else {
                  invalidate(undefined, true);
                }
              };

            minutesInputEl.bind('blur', function(e) {
              if ( !scope.invalidMinutes) {
                scope.$apply( function() {
                  scope.minutes = pad(scope.minutes, 2);
                });
              }
            });

            ngModel.$render = function() {
              var date = ngModel.$modelValue ? new TimeInterval( ngModel.$modelValue ) : null;
              if ( isNaN(date) ) {
                ngModel.$setValidity('time', false);
//                $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
              } else {
                if ( date ) {
                  selected = date;
                }
                makeValid();
                updateTemplate();
              }
            };

            // Call internally when we know that model is valid.
            function refresh( keyboardChange ) {
              makeValid();
              ngModel.$setViewValue( new TimeInterval(selected) );
              updateTemplate( keyboardChange );
            }

            function makeValid() {
              ngModel.$setValidity('time', true);
              scope.invalidHours = false;
              scope.invalidMinutes = false;
            }

            function updateTemplate( keyboardChange ) {
              var hours = selected.getHours(), minutes = selected.getMinutes();

              scope.hours =  keyboardChange === 'h' ? hours : pad(hours, 3);
              scope.minutes = keyboardChange === 'm' ? minutes : pad(minutes, 2);
            }
                        
            function addMinutes( minutes ) {
              var dt = new TimeInterval( selected.getTime() + minutes * 60000 );
              var hh = dt.getHours();
              hh = (hh < 0)? 999: hh;  
              hh = (hh > 999)? 0: hh;  
              selected = new TimeInterval( hh, dt.getMinutes(), dt.getSeconds() );

              refresh();
            }

            scope.increaseHours = function() {
              addMinutes(60);
            };
            scope.decreaseHours = function() {
              addMinutes(-60);
            };
            scope.increaseMinutes = function() {
              addMinutes(1);
            };
            scope.decreaseMinutes = function() {        
              addMinutes(-1);
            };

            // Respond on mousewheel spin
            var mousewheel = true; //(angular.isDefined(attrs.mousewheel)) ? scope.$eval(attrs.mousewheel) : timepickerConfig.mousewheel;
            if ( mousewheel ) {

              var isScrollingUp = function(e) {
                if (e.originalEvent) {
                  e = e.originalEvent;
                }
                //pick correct delta variable depending on event
                var delta = (e.wheelDelta) ? e.wheelDelta : -e.deltaY;
                return (e.detail || delta > 0);
              };
              hoursInputEl.bind('mousewheel wheel', function(e) {
                scope.$apply( (isScrollingUp(e)) ? scope.increaseHours() : scope.decreaseHours() );
                e.preventDefault();
              });

              minutesInputEl.bind('mousewheel wheel', function(e) {
                scope.$apply( (isScrollingUp(e)) ? scope.increaseMinutes() : scope.decreaseMinutes() );
                e.preventDefault();
              });
            }
 
            /* Displays hours - what the user sees */
            scope.displayHours = function () {
 
                //Create vars
                var hoursToDisplay = scope.hours;
 
                //Check whether to reset etc
                if (scope.hours > 999) {
                    hoursToDisplay = scope.hours - 999;
                }                
                if (scope.hours < 0) {
                    hoursToDisplay = scope.hours + 999;
                }                
 
                return pad(hoursToDisplay, 3);
            };
 
            /* Displays minutes */
            scope.displayMinutes = function () {
                return pad(scope.minutes, 2);
            };
 
        }
    };
});
