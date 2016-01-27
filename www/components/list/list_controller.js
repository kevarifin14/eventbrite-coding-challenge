angular.module('list_controller', [])

.controller(
  'ListController',
  function(
    $ionicLoading,
    $ionicPopup,
    $scope,
    EventbriteEvents
  ) {
    $ionicLoading.show();
    EventbriteEvents.get({ 'start_date.keyword': 'this_month' })
    .$promise.then(function(events) {
      $scope.events = events.events;
      $ionicLoading.hide();
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'There was an error processing your request. We probably ran out of Eventbrite API calls :('
      })
    });

    $scope.dividerFunction = function(key) {
      return key;
    }

});
