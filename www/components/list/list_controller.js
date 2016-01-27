angular.module('list_controller', [])

.controller(
  'ListController',
  function(
    $ionicLoading,
    $scope,
    EventbriteEvents
  ) {
    $ionicLoading.show();
    EventbriteEvents.get({ 'start_date.keyword': 'this_month' })
    .$promise.then(function(events) {
      $scope.events = events.events;
      $ionicLoading.hide();
    });

    $scope.dividerFunction = function(key) {
      return key;
    }

});
