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

		// Set grid height
		$scope.twineGridOptions = {
			data: $scope.ngTwine.balesDisplay,
			enableFiltering: true,
			onRegisterApi: function( gridApi ) {
				$scope.gridApi = gridApi;
				$scope.gridApi.core.on.filterChanged( $scope, function() {
					
					// Filter data
					//$scope.ngTwine.filterData();

					console.log( $scope.gridApi )//.getVisibleRows( $scope.twineGridOptions ) );
				});
			}
		};

		// Watch application marker data
		// $scope.$watch( 'ngTwine.balesDisplay', function () {
		// 	$scope.twineGridOptions.data = $scope.ngTwine.balesDisplay;
		// 	$scope.ngTwine.columns = $scope.gridApi.grid.columns;
		// });
	}]);