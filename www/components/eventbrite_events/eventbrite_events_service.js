angular.module('eventbrite_events_service', ['ngResource'])

.factory('EventbriteEvents', function($resource) {
  return $resource(
    'https://www.eventbriteapi.com/v3/events/search/?token=B2SRRPLMX4XC3L5Q4CUP'
  );
})
