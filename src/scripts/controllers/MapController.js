'use strict';

/**
 * @ngdoc overview
 * @name Punkto
 * @description
 * # MapModule
 *
 * Map module of the application.
 */

// Grey
// https://{s}.tiles.mapbox.com/v3/jduren.ifcogn99/{z}/{x}/{y}.png

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

		// Update map on table filter
		$scope.$watch( 'ngTwine.baleData', function () {
			$scope.updateMarkers();
		});		

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
			markers: $scope.ngTwine.baleData,
			layers: {
				baselayers: {
					osm: {
						name: 'OpenStreetMap',
						url: 'http://{s}.tiles.mapbox.com/v3/aj.um7z9lus/{z}/{x}/{y}.png',
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

		// Update markers and zoom to bounds (not sure why this does not bind)
		$scope.updateMarkers = function() {
			$scope.markers = $scope.ngTwine.baleData;
			leaflet.getMap().then( function( map ) {
				if ( $scope.ngTwine.baleData.length ) {
					map.fitBounds( $scope.getBounds( $scope.markers ) );
				}
			});
		};

		// Zoom to location
		$scope.zoomToLocation = function( m ) {
			leaflet.getMap().then( function( map ) {
				map.setView( [m.lat, m.lng], 9 );
			});
		};		

		// Get bounds from array of markers
		$scope.getBounds = function( markers ) {
			var latlngs = [];
			// Create latlng array
			angular.forEach( markers, function( m, key ) {
				this.push( [m.lat,m.lng] );
			}, latlngs );

			// Return bounds
			return new L.LatLngBounds( latlngs );
		};

	}]);