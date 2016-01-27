angular.module('eventbrite_profile_service', ['ngResource'])

.factory('EventbriteProfile', function($resource) {
  return $resource(
    'https://www.eventbriteapi.com/v3/users/me/?token=B2SRRPLMX4XC3L5Q4CUP'
  );
})
