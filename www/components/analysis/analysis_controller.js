angular.module('analysis_controller', [])

.controller(
  'AnalysisController',
  function(
    $cordovaGeolocation,
    $ionicLoading,
    $ionicPopup,
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
    }, function(error) {
      $ionicPopup.alert({
        title: 'There was an error processing your request. We probably ran out of Eventbrite API calls :('
      })
      $ionicLoading.hide();
    });

    $scope.initialize = function() {
      var mapOptions = {
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      $scope.map.setCenter(new google.maps.LatLng(41.850033, -87.6500523));


      google.maps.event.addListenerOnce($scope.map, 'idle', function() {
        for (var i = 0; i < locations.length; i++) {
          coordinates = locations[i];
          new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(coordinates[0], coordinates[1])
          });
        }
      });
    }
});
