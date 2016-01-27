angular.module('home_controller', [])

.controller(
  'HomeController',
  function(
    $scope,
    EventbriteProfile
  ) {
    $scope.me = EventbriteProfile.get();
});
