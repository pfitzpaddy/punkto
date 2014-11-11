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

		// Bale data 
		$scope.baleData = [];

		// Get the countries geojson data from a JSON
		$http.get("data/ifrc-dbm-serria-leone.json").success( function( json, status ) {
			// Add markers to $scope
			angular.forEach(json.data, function(d, i) {
				if ( typeof d.Latitude === "number" && typeof d.Longitude === "number" ) {          
					// Push onto array of markers
					this.push({
						uuid: d.ID,
						name: d.District,
						lng: d.Longitude,
						lat: d.Latitude,
						message: '<div align="center"><b>' + d.District + '</b><br/>' + d.AlertDate + '<br/>Deceased Collected From: ' + d.DeceasedCollectedFrom + '</div>',                    
						icon: { 
							iconSize: [18, 18],
							iconUrl: 'assets/icons/refugee-camp-healthfacility.png'
						}
					});
				}
			}, $scope.baleData );
		});	

	}]);
