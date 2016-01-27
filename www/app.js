// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module(
  'eventbriteEvents',
  [
    'ionic',
    'ionic.ion.autoListDivider',
    'chart.js',
    'analysis_controller',
    'home_controller',
    'list_controller',
    'eventbrite_events_service',
    'eventbrite_profile_service',
    'eventbrite_venue_service',
    'ngResource',
    'ngCordova'
  ]
)

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'components/menu/menu.html',
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'components/home/home.html',
        controller: 'HomeController'
      }
    }
  })

  .state('app.list', {
    url: '/list',
    views: {
      'menuContent': {
        templateUrl: 'components/list/list.html',
        controller: 'ListController'
      }
    }
  })

  .state('app.analysis', {
    url: '/analysis',
    views: {
      'menuContent': {
        templateUrl: 'components/analysis/analysis.html',
        controller: 'AnalysisController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
