angular.module('eventbrite_venue_service', ['ngResource'])

.factory('EventbriteVenue', function($resource) {
  return $resource(
    'https://www.eventbriteapi.com/v3/venues/:id/?token=B2SRRPLMX4XC3L5Q4CUP'
  );
})
