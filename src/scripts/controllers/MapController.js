'use strict';

/**
 * @ngdoc overview
 * @name Punkto
 * @description
 * # MapModule
 *
 * Map module of the application.
 */
angular.module( 'MapModule', [ 
	'leaflet-directive' 
])

// leaflet (updates map height)
.directive( 'leaflet', function() {
	return function ( scope, element, attrs ) {
		attrs.height = window.innerHeight - 60 + 'px';
	}
})

// module main controller
.controller( 'MapCtrl', [ 
	'$scope', 
	'leafletData', 
	function( $scope, leaflet ) {
		
		// App main
		$scope.ngTwine = $scope.$parent;

		// Defaults
		angular.extend( $scope, {
			defaults: {
				minZoom: 4,
				zoomControl: false,
				scrollWheelZoom: false
			},
			center: {
				lat: 0,
				lng: 0,
				zoom: 3
			},
			events: {
				map: {
					enable: ['zoomend'],
					logic: 'emit'
				}
			},
			markers: $scope.ngTwine.balesDisplay,
			layers: {
				baselayers: {
					osm: {
						name: 'OpenStreetMap',
						url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
						type: 'xyz'
					}
				},
				overlays: {
					locations: {
						name: 'Locations',
						type: 'group',
						visible: true
					}
				}				
			}
		});

		// Add zoom control to bottom left
		leaflet.getMap().then( function( map ) {
			new L.Control.Zoom( { position: 'bottomright' } ).addTo( map );
		});

		// Watch application marker data
		$scope.$watch( 'ngTwine.balesDisplay', function () {
			$scope.updateMarkers();
		});

		// Update markers and zoom to bounds (not sure why this does not bind)
		$scope.updateMarkers = function() {
			$scope.markers = $scope.ngTwine.balesDisplay;
			leaflet.getMap().then(function(map) {
				// 
				if ( $scope.ngTwine.balesDisplay.length ) {
					map.fitBounds($scope.getBounds($scope.markers));
				}
			});
		};

		// Zoom to location
		$scope.zoomToLocation = function(m) {
			leaflet.getMap().then(function(map) {
				map.setView( [m.lat, m.lng], 10 );
			});
		};		

		// Get bounds from array of markers
		$scope.getBounds = function(markers) {
			var latlngs = [];
			// Create latlng array
			angular.forEach(markers, function(m, key) {
				this.push([m.lat,m.lng]);
			}, latlngs);

			// Return bounds
			return new L.LatLngBounds(latlngs);
		};

	}]);