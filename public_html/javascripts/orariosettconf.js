'use strict';

var CollapseConfig = function($scope, $document, $timeout) {
  $scope.orario_parms = {
   'dpp': null,
   'mpp': null,
   'mhg': null,
   'ols': null
	
  };
  $scope.orario_parms_default = {
   'dpp': (new Date()).setHours(0, 15, 0, 0),
   'mpp': (new Date()).setHours(6, 0, 0, 0),
   'mhg': (new Date()).setHours(9, 0, 0, 0),
   'ols': (new TimeInterval(36, 0, 0)).getTime()
  };  
  
  $scope.setTime = function(hh, mm) {
    var aDate = new Date();
    aDate.setHours(hh, mm, 0, 0);
    return aDate;
  };

  $scope.initialize = function() {
	angular.forEach($scope.orario_parms_default, function(value, key){		
		if (angular.isUndefined(localStorage.getItem(key))) {
		  localStorage.setItem(key, value);
		}
		$scope.orario_parms[key] = (key !== 'ols')? new Date(localStorage.getItem(key)): new TimeInterval(parseInt(localStorage.getItem(key)));
	  });
  };

  $scope.changed = function(key) {
	var v = (key !== 'ols')? $scope.orario_parms[key]: $scope.orario_parms[key].getTime();
	localStorage.setItem(key, v);
  };

  $scope.reset_data = function() {
    $scope.orario_parms = angular.copy($scope.orario_parms_default);
    localStorage.removeItem('dpp');
    localStorage.removeItem('mpp');
    localStorage.removeItem('mhg');
    localStorage.removeItem('ols');
  };
};