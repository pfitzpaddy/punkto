'use strict';

/**
 * @ngdoc overview
 * @name Punkto
 * @description
 * # GridModule
 *
 * Map module of the application.
 */
angular.module( 'GridModule', [ 
	'ui.grid' 
])

// Grid controller
.controller( 'GridCtrl', [ 
	'$scope', 
	function( $scope ) {
		
		// App main
		$scope.ngTwine = $scope.$parent;

		// Grid options
		$scope.twineGridOptions = {
			data: $scope.ngTwine.baleData,
			enableFiltering: true,
			onRegisterApi: function( gridApi ) {
				
				// ui.grid API
				$scope.gridApi = gridApi;

				// filter changed event
				$scope.gridApi.core.on.filterChanged( $scope, function() {

					// Filter data
					setTimeout( function(){
						$scope.ngTwine.baleData = [];

						// For each filtered data, update main dataset
						angular.forEach( $scope.gridApi.core.getVisibleRows( $scope.gridApi.grid ), function( d, i ) {
							$scope.ngTwine.baleData.push( d.entity );
						});
					}, 0 );

					// Update grid height to match page
					$scope.gridApi.grid.gridHeight = window.innerHeight - 60;
				});
			}
		};

	}]);