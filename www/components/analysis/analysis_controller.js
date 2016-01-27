angular.module('analysis_controller', [])

.controller(
  'AnalysisController',
  function(
    $cordovaGeolocation,
    $ionicLoading,
    $scope,
    EventbriteEvents,
    EventbriteVenue
  ) {
    var locations = [];
    $ionicLoading.show();
    EventbriteEvents.get({
      'start_date.keyword': 'this_week'
    }).$promise.then(function(events) {
      eventsList = events.events;

      var values = new Array(31).fill(0);

      for (var i = 0; i < eventsList.length; i++) {
        event = eventsList[i];
        var dateIndex = new Date(event.start.utc).getDay() - 1;
        values[dateIndex] += 1;

        if (event.venue_id != null) {
          EventbriteVenue.get({ id: event.venue_id }).$promise.then(function(venue) {
            var lat = parseFloat(venue.latitude);
            var long = parseFloat(venue.longitude);
            locations.push([lat, long])
          });
        }
      }

      $scope.labels = ['Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.', 'Sun.'];
      $scope.data = [values];

      $ionicLoading.hide();
    });

    $scope.initialize = function() {
      var mapOptions = {
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      $scope.map.setCenter(new google.maps.LatLng(41.850033, -87.6500523));

      for (coordinates in locations) {
        var latLng = new google.maps.LatLng(coordinates[0], coordinates[1]);

        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });
      }
    }
});
