// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var test=angular.module('start', ['ionic'] )
var exampleApp=angular.module('starter', ['ionic'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
document.addEventListener("deviceready", init, false);
function init() {
  document.querySelector("#startScan").addEventListener("touchend", startScan, false);
  resultDiv = document.querySelector("#results");
}

function startScan() {

  cordova.plugins.barcodeScanner.scan(
    function (result) {
      upc=result.text;
      var s = "<b><font color=blue>Result:</font></b>" + result.text + "<br/>" +
        "<b><font color=blue>Format:</font></b>" + result.format + "<br/>";
      resultDiv.innerHTML = s;
    },
    function (error) {
      alert("Scanning failed: " + error);
    }
  );

}
exampleApp.controller('ExampleController', function($scope, $http, $ionicPopup, $timeout) {


  $scope.inputs = [{
    value: null
  }];

  $scope.pric=[] ;
  $scope.nam=[];

  $scope.field=function () {
    $scope.inputs.push({
      value: null
    })
  }
  $scope.addInput = function () {
    $scope.prices = [];
    $scope.names=[];

    for (var i = 0; i < $scope.inputs.length; i++) {

      //console.log($scope.inputs[i]);
      $http.get("http://api.walmartlabs.com/v1/search?apiKey=9gnk426wzsb972r7xmumfaxr&query=" + $scope.inputs[i].value + "&numItems=1")
        .success(function (data) {

          //$scope.prices[i]= data.items[0].salePrice;
          //console.log(data.items[0].salePrice);
          //str.search(/todd/i);
          //$scope.inputs[i].search(data.items[0].name)

          //if ($scope.inputs[i].contains(data.items[0].name)){

          //console.log($scope.inputs[0],data.items[0].name)

          $scope.prices.push(data.items[0].salePrice);
          console.log($scope.prices)

          $scope.names.push(data.items[0].name);

          //}
          //$scope.price[i]=$scope.prices[i];
          //console.log($scope.price)
          $scope.pric=$scope.prices;
          $scope.nam=$scope.names;
          //console.log($scope.pric)
        })
        .error(function (data) {
          //alert("ERROR");
        });

    }
  }
  $scope.popUp = function(){
    $scope.addInput();
    $scope.popUp = $ionicPopup.alert({
      animation: $scope.animationsEnabled,
      templateUrl: 'popup.html',
      cssClass: 'popupcss',
      scope: $scope
    });
  };

  $scope.removeInput = function (index) {
    $scope.inputs.splice(index, 1);
  }
  $scope.getData = function() {

  }
  $scope.displ=function () {
    console.log($scope.pric)
  }

});
/**
 * Created by nikky on 11/17/2016.
 */
