(function() {
    'use strict';

    var myApp = angular.module('myApp', ['ngMaterial', 'ngMessages']);

/**
 * Based on https://gist.github.com/ShirtlessKirk/2134376
 * Variant of Avraham Plotnitzky's String.prototype method mixed with the "fast" version
 * see: https://sites.google.com/site/abapexamples/javascript/luhn-validation
 * @author ShirtlessKirk. Copyright (c) 2012.
 * Licensed under WTFPL (http://www.wtfpl.net/txt/copying)
 */
var luhnChk = function(luhn) {
  var len = luhn.length,
    mul = 0,
    prodArr = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
    ],
    sum = 0;

  while (len--) {
    sum += prodArr[mul][parseInt(luhn.charAt(len), 10)];
    mul ^= 1;
  }

  return sum % 10 === 0 && sum > 0;
};


myApp.directive('luhnCheck', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attributes, ngModel) {

      function luhnCheck(value) {
                    ngModel.$setValidity('luhn-check', luhnChk(value));
                    return value;
      }

      ngModel.$parsers.push(luhnCheck);
      ngModel.$formatters.push(luhnCheck);
    }

  };
})


    myApp.config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo', {
                'default': '400', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
            .accentPalette('purple', {
                'default': '200' // use shade 200 for default, and keep all other shades the same
            });
    });
    myApp.controller('AppCtrl', function($scope, $http, $timeout) {
      $scope.myNumber = null;
        $scope.submitForm = function() {
            $scope.notification = "Form is sending...";
            $timeout(function () {
              $scope.notification = "Form was send!";
            }, 2000);
            $http.post('http://posttestserver.com/post.php?dir=jsfiddle', JSON.stringify($scope.fields)).success(function(res) {
				          console.log("Udało się wysłać POST: " + res);
			}).error(function() {
    				      console.log("Nie udało się wysłać POST!");
			       });
        };
    });
}());
