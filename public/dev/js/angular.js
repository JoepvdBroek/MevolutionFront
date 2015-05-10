var app = angular.module('mevolution-app', [])
.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('ModeratorController', function($scope) {
    $scope.testvar = "hoi";
});