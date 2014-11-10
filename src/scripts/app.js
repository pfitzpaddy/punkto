'use strict';

/**
 * @ngdoc overview
 * @name Punkto
 * @description
 * # testingApp
 *
 * Main module of the application.
 */
var app = angular.module('twineApp', [
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'MapModule',
	'GridModule'
])
// config (i.e. routes)
.config(function ( $routeProvider ) {})

// module main controller
.controller( 'twineAppCtrl', [ 
	'$scope', 
	'$http', 
	'$filter', 
	'$location', 
	function( $scope, $http, $filter, $location ){

		// Marker data 
		$scope.bales = [];
		$scope.balesDisplay = [];

		// Get the countries geojson data from a JSON
		$http.get("data/ifrc-dbm-serria-leone.json").success( function( json, status ) {
			// Add markers to $scope
			angular.forEach(json.data, function(d, i) {
				if ( typeof d.Latitude === "number" && typeof d.Longitude === "number" ) {			
					// Push onto array of markers
					this.push({
						uuid: d.ID,
						layer: 'locations',
						name: d.District,
						lng: d.Longitude,
						lat: d.Latitude,					
						icon: { 
							iconSize: [18, 18],
							iconUrl: 'assets/icons/refugee-camp-healthfacility.png'
						}
					});
				}
			}, $scope.bales );
			
			// Run initial filter
			$scope.filterData();			
		});

		$scope.filterData = function() {
			//
			$scope.balesDisplay = $scope.bales;
			$scope.balesDisplay = $filter('filter')($scope.bales, function( bale, i ){
				angular.forEach( bale, function( d, key ) {
					//
					if ($scope.columns) {
						console.log($scope.columns);
					}
				});
				return true;
			});
		}

		// // Run filter on search Box change
		// $scope.$watch( 'teamId', 'district', 'alert', function () {
		// 	// $scope.filterData();
		// }, true );

	}]);
