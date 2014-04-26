'use strict';

var TimeTableCtrl = function($scope, $document, $timeout) {  
  /*$scope.mytime = new Date();*/
  $scope.ingresso = new Array();
  $scope.uscita = new Array();
  $scope.giornate = [
      {
          'gg': 'Domenica',
          'lav': false,
          'ingresso': null,
          'uscita': null
      },
      {
          'gg': 'Lunedì',
          'lav': true,
          'ingresso': new Date(2013,1,1,8,0,0,0),
          'uscita': new Date(2013,1,1,16,30,0,0)
      },
      {
          'gg': 'Martedì',
          'lav': true,
          'ingresso': new Date(2013,1,1,8,0,0,0),
          'uscita': new Date(2013,1,1,16,30,0,0)
      },
      {
          'gg': 'Mercoledì',
          'lav': true,
          'ingresso': new Date(2013,1,1,8,0,0,0),
          'uscita': new Date(2013,1,1,16,30,0,0)
      },
      {
          'gg': 'Giovedì',
          'lav': true,
          'ingresso': new Date(2013,1,1,8,0,0,0),
          'uscita': new Date(2013,1,1,16,30,0,0)
      },
      {
          'gg': 'Venerdì',
          'lav': true,
          'ingresso': new Date(2013,1,1,8,0,0,0),
          'uscita': new Date(2013,1,1,16,30,0,0)
      },
      {
          'gg': 'Sabato',
          'lav': false,
          'ingresso': null,
          'uscita': null
      }
  ];
  
  $scope.lavorativoFestivo = function(ggLav) {
/*    console.log('il giorno è lavorativo? ' + x + ".");*/
    var x = (ggLav ? '': 'warning');
/*    console.log('la classe è :' + x + ".");*/
    return x;
  };
  
    $scope.diffOraria = function(gg) {    
    var tmp_date = new Date(0);
    if (angular.isDate(gg.uscita) && angular.isDate(gg.ingresso)) {      
      if (!angular.isDate(gg.uscita - gg.ingresso)) {
        tmp_date.setTime(gg.uscita - gg.ingresso); 
      } else {
        tmp_date.setTime(0);
      }
    } else {
      tmp_date = null;
    }
//    console.log('diff_oraria vale:' + tmp_date);
    return tmp_date;
  };

  $scope.diffOrariaStringa = function(gg) {   
    var tmp_date = $scope.diffOraria(gg);
    if (angular.isDate(tmp_date)) {
      return tmp_date.getUTCHours() + ":" + (("0" + tmp_date.getUTCMinutes()).slice(-2));
    } else {
      return '-:-';
    }
//    console.log('definito tmp_date:' + tmp_date + ".");
  };

  $scope.maturaPausa = function(gg) {    
    var tmp_date = $scope.diffOraria(gg);
     if (angular.isDate(tmp_date)) {
      return (tmp_date.getUTCHours() > 6 || 
              (tmp_date.getUTCHours() === 6 && tmp_date.getUTCMinutes() > 0));
    } else 
      return null;
  };

  $scope.maturaPausaStringa = function(gg) {    
    var pausa = $scope.maturaPausa(gg);
//     console.log('maturaPausaStringa ' + gg.gg + ': ' + pausa + ".");
    return (pausa !== null)? (((pausa)? 'Sì': 'No')): '-';
  };

  $scope.lavorato = function(gg) {
    var minuti_di_pausa = new Date(0);
    minuti_di_pausa.setMinutes(15);
    var tmp_date = $scope.diffOraria(gg);
    if (tmp_date !== null) {
        if ($scope.maturaPausa(gg)) {
            tmp_date.setTime(tmp_date.getTime() - minuti_di_pausa.getTime());
    //        console.log("Matura pausa: " + tmp_date + ".");
          return tmp_date;
        } else {
    //        console.log("NON matura pausa.");
          return tmp_date;
        };
    } else {
        return null;
    }
        
  };
  
  $scope.lavoratoStringa = function(gg) {
    var tmp_date = $scope.lavorato(gg);
    if (tmp_date !== null) { 
//    console.log('lavoratoStringa per gg:' + gg.gg + ", vale: " + tmp_date + ".");
//    console.log(tmp_date.getUTCHours() + ":" + (("0" + tmp_date.getUTCMinutes()).slice(-2)));
      return tmp_date.getUTCHours() + ":" + (("0" + tmp_date.getUTCMinutes()).slice(-2));
    } else {
      return '-:-';
    }
        
  };
  
  $scope.allertaInconsistenza = function(gg) {
      var tmp_date = $scope.diffOraria(gg);
      if (tmp_date === null) { 
          return false;
      } else {
        if (($scope.maturaPausa(gg) && tmp_date.getUTCHours() === 6 && tmp_date.getUTCMinutes() < 16) || 
            (! $scope.maturaPausa(gg) && tmp_date.getUTCHours() === 6 && tmp_date.getUTCMinutes() > 0)) {
            return true;
        } else {
            return false;
        }
    }
  };
  
  $scope.allertaInconsistenzaStringa = function (gg) {
      //console.log(($scope.allertaInconsistenza(gg))? 'text-error': 'text-success');
      return ($scope.allertaInconsistenza(gg))? 'text-error': 'text-success';
  };
  
    $scope.totaleLavorato = function() {
    var tot_time = 0; 
    angular.forEach($scope.giornate, function(value, index){
        var lav = $scope.lavorato(value);
        tot_time += (lav !== null)? lav.getTime(): 0;
    }, tot_time);
    //console.log('totale Lavorato: ' + tot_time);
    return new Date(tot_time);
  };

  $scope.totaleLavoratoStringa = function() {    
    var tmp_date = $scope.totaleLavorato();
    return new TimeInterval(tmp_date).toString();
  };


  $scope.allertaTotLavorato = function() {
      var tmp_date = new TimeInterval($scope.totaleLavorato());
      if (tmp_date === null) { 
          return false;
      } else {
//          console.log('totale Lavorato: ' + tmp_date.getHours() + ':' + tmp_date.getUTCMinutes());
        if ((tmp_date.getHours() !== 36) || 
            (tmp_date.getHours() === 36 && tmp_date.getUTCMinutes() !== 0)) {
            return true;
        } else {
            return false;
        }
    }
  };
  
  $scope.allertaTotLavoratoStringa = function () {
      //console.log(($scope.allertaInconsistenza(gg))? 'text-error': 'text-success');
      return ($scope.allertaTotLavorato())? 'text-error': 'text-success';
  };



/*******************************************************************/  
  
/*
  $scope.clear = function() {
    $scope.ingresso = new Array();
    $scope.uscita = new Array();
  };

    $scope.init = function() {
      var gg_inizio =  new Date();
      var gg_fine =  new Date();
      gg_inizio.setHours(8, 0, 0, 0);
      gg_fine.setHours(17, 30, 0, 0);
    for (var gg = 0; gg++; gg < 7) {
      $scope.ingresso[gg] = gg_inizio;
      $scope.uscita[gg] = gg_fine;
    }
  };
/*};

var TimepickerDemoCtrl = function ($scope) {

*/

  $scope.changed = function () {
    /*console.log('Time changed to: ' + $scope.mytime);*/
  };

  $scope.copy = function(atime) {
//    console.log('Time copied: ' + atime);
    $scope.mytime = atime;
    return $scope.mytime; 
  };

  $scope.paste = function() {
//    console.log('Time to paste: ' + $scope.mytime);
    return $scope.mytime; 
  };

  $scope.clear = function() {
//    console.log('Time cleared: null');
    $scope.mytime = null;
    return $scope.mytime; 
  };
  
  $scope.get = function() {
    $scope.mytime.setSeconds(0);
    $scope.mytime.setMilliseconds(0);
//    console.log('Return time is: ' + $scope.mytime);
    return $scope.mytime; 
  };
  
  $scope.closePopover = function(item_id) {
    var buttons;
//    console.log('I\'m closing the popover.');
    var doc = $document[0];
    
    buttons = doc.getElementsByClassName('popover-button');   
//    console.log('There are as many buttons as ' + buttons.length + " duck(s) in the pound!");
      if (buttons.length === 0) {
//        console.log('No ducks in the pound (how can this is?!), sorry :-/!');
      } else {
          var button = null;
//          console.log('->' + item_id +'.');
          angular.forEach(buttons, function(item, index){
                   if (item.id === item_id) { button = item; };
              });              
          $timeout(function () {button.click(); }, 1, false);        
      };
  };
};

