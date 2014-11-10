'use strict';

/**
 * @ngdoc overview
 * @name Punkto
 * @description
 * # testingApp
 *
 * Main module of the application.
 */
angular
	.module('twineApp', [
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'MapModule',
		'GridModule'
	])
	.config(function ($routeProvider) {

	})
	.controller( 'twineAppCtrl', [ '$scope', '$http', '$filter', '$location', function( $scope, $http, $filter, $location ){
		// Marker data 
		$scope.markerData = [];
		$scope.markerDataFiltered = [];
		// URL search params
		$scope.teamSearch = $location.search().team;
		$scope.districtSearch = $location.search().district;
		$scope.alert = $location.search().alert;

		// Get the countries geojson data from a JSON
		$http.get("data/ifrc-dbm-serria-leone.json").success( function( json, status ) {
			// Add markers to $scope
			angular.forEach(json.data, function(d, i) {
				if ( typeof d.Latitude === "number" && typeof d.Longitude === "number" ) {			
					// Push onto array of markers
					this.push({
						layer: 'locations',
						uuid: d.ID,
						teamId: d.TeamID,
						district: d.District,
						alert: d.AlertDate,
						lng: d.Longitude,
						lat: d.Latitude,
						message: d.District,
						focus: false,						
						icon: { 
							iconSize: [18, 18],
							iconUrl: 'assets/icons/refugee-camp-healthfacility.png'
						}
					});
				}
			}, $scope.markerData);

			// Run initial ßfilter
			$scope.filterData();

		});

		// Run filter on search Box change
		$scope.$watch( "teamId", "district", "alert", function () {
			$scope.filterData();
		}, true);

		// Filter marker data
		$scope.filterData = function() {
			// Set URL
			$scope.setUrlParams();
			// Filter data
			$scope.markerDataFiltered = [];
			angular.forEach( $scope.markerData, function( m, key ) {
				// Filter on all columns
				if ( $scope.filterTeam( m ) && $scope.filterDistrict( m ) && $scope.filterAlert( m ) ) {
					this.push( m );
				}
			}, $scope.markerDataFiltered );
		};

		// Update URL
		$scope.setUrlParams = function(){
			if ($scope.teamSearch || $scope.districtSearch || $scope.alertSearch ) {
				$location.search( 'team', $scope.teamSearch );
				$location.search( 'district', $scope.districtSearch );
				$location.search( 'alert', $scope.alertSearch );
			} else {
				$location.search({});
				$location.path('');
			}
		};
		
		// filter uuid
		$scope.filterTeam = function( m ) {
			// Search uuid
			if ( $scope.teamSearch && $scope.teamSearch.length > 0 ) {
				return m.teamId == $scope.teamSearch;
			} else {
				return true;
			}
		};

		// filter country name
		$scope.filterDistrict = function( m ) {
			// Search country

			if ( $scope.districtSearch && $scope.districtSearch.length > 0 ) {
				return m.district.toLowerCase().indexOf($scope.districtSearch.toLowerCase()) > -1;
			} else {
				return true;
			}
		};

		// filter location name
		$scope.filterAlert = function( m ) {
			// Search location name
			if ( $scope.alertSearch && $scope.alertSearch.length > 0 ) {
				return m.alert.toLowerCase().indexOf($scope.alertSearch.toLowerCase()) > -1;
			} else {
				return true;
			}
		};

	}]);
