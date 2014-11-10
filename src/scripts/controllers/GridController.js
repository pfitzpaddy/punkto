(function(){	

	'use strict';

	/**
	 * @ngdoc overview
	 * @name Punkto
	 * @description
	 * # GridModule
	 *
	 * Map module of the application.
	 */
	var app = angular.module( 'GridModule', [ 
		'ui.grid' 
	]);

	// Grid controller
	app.controller( 'GridCtrl', [ 
		'$scope', 
		function( $scope ) {
			
			// App main
			$scope.ngTwine = $scope.$parent;

			// Set grid height
			$scope.twineGridOptions = {
				enableFiltering: true,
				columnDefs: [
					{ 
						field: 'teamId',
						filter: {
							term: $scope.ngTwine.teamSearch,
							condition: function(searchTerm, cellValue) {
								return true;
							}
						}
					},
					{ 
						field: 'district',
						filter: {
							term: $scope.ngTwine.districtSearch,
							condition: function(searchTerm, cellValue) {
								return true;
							}
						}
					},
					{ 
						field: 'alert',
						filter: {
							term: $scope.ngTwine.alertSearch,
							condition: function(searchTerm, cellValue) {
								return true;
							}
						}
					}
				],
				onRegisterApi: function( gridApi ) {
					$scope.gridApi = gridApi;
					$scope.gridApi.core.on.filterChanged( $scope, function() {
						
						// On filter changed, get filter values
						$scope.ngTwine.teamSearch = this.grid.columns[0].filter.term;
						$scope.ngTwine.districtSearch = this.grid.columns[1].filter.term;
						$scope.ngTwine.alertSearch = this.grid.columns[2].filter.term;
						// Filter data
						$scope.ngTwine.filterData();
					});
				}
			};

			// Watch application marker data
			$scope.$watch( 'ngTwine.markerDataFiltered', function () {
				$scope.twineGridOptions.data = $scope.ngTwine.markerDataFiltered;
			});
		}
	]);
})();