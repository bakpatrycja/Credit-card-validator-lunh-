(function() {
    'use strict';

    var myApp = angular.module('myApp', ['ngMaterial', 'ngMessages']);

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
        $scope.submitForm = function() {
            $scope.notification = "Form is sending...";
            $timeout(function () {
              $scope.notification = "Form was send!";
            }, 2000);
            $http.post('http://posttestserver.com/post.php?dir=jsfiddle', JSON.stringify($scope.fields)).success(function(res) {
				          console.log("Udało się wysłać POST: " + res);
			}).error(function() {
    				      console.log("Nie udało się wysłać POST!");
    				      $scope.notification = 'Formularz nie został wysłany';
			       });
        };
    });
}());
