angular.module('analysis_controller', [])

.controller(
  'AnalysisController',
  function(
    $ionicLoading,
    $scope,
    EventbriteEvents,
    EventbriteVenue
  ) {
    $ionicLoading.show();
    var today = new Date();
    var one_month_later = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    EventbriteEvents.get({
      'start_date.keyword': 'this_month'
    }).$promise.then(function(events) {
      eventsList = events.events;

      var values = new Array(31).fill(0);
      var venueHash = {};

      for (var i = 0; i < eventsList.length; i++) {
        event = eventsList[i];
        var dateIndex = new Date(event.start.utc).getDate() - 1;
        values[dateIndex] += 1;

        if (event.venue_id != null) {
          EventbriteVenue.get({ id: event.venue_id }).$promise.then(function(venue) {
            if (venue.name != null) {
              var label = venue.name;
            } else {
              var label = "Other";
            }

            if (label in venueHash) {
              venueHash[label] += 1;
            } else {
              venueHash[label] = 1;
            }
          });
        }

      }

      $scope.labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      $scope.series = ['January'];
      $scope.data = [values];

      $ionicLoading.hide();
    });
});
