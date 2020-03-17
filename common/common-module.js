(function() {
  'use strict';
  angular
  .module('jett', [
    'ui.router',
    'admin',
    'moment'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/home',
      views: {
        'chewy': {
          templateUrl: 'common/views/home.html',
          controller: 'CommonController as ctrl'
        },
        'header': {
          templateUrl: 'common/views/header.html',
          controller: 'HeaderCtrl as ctrl'
        }
      }
    })
    .state('contact', {
      url: '/contact',
      views: {
        'chewy': {
          templateUrl: 'common/views/contact.html',
          controller: 'CommonController as ctrl'
        },
        'header': {
          templateUrl: 'common/views/header.html'
        }
      }
    })
    .state('result', {
      url: '/submission/:res',
      views: {
        'chewy': {
          templateUrl: 'common/views/result.html',
          controller: 'ResultCtrl as rst'
        },
        'header': {
          templateUrl: 'common/views/header.html'
        }
      }
    })
    .state('staff', {
      url: '/staff',
      views: {
        'chewy': {
          templateUrl: 'common/views/staff.html',
          controller: 'CommonController as ctrl'
        },
        'header': {
          templateUrl: 'common/views/header.html'
        }
      }
    })
    .state('services', {
      url: '/services',
      views: {
        'chewy': {
          templateUrl: 'common/views/services.html',
          controller: 'ServicesController as sCtrl'
        },
        'header': {
          templateUrl: 'common/views/header.html'
        }
      }
    })
    .state('resources', {
      url: '/resources',
      views: {
        'chewy': {
          templateUrl: 'common/views/resources.html',
          controller: 'CommonController as ctrl'
        },
        'header': {
          templateUrl: 'common/views/header.html'
        }
      }
    })
    .state('form', {
      url: '/newpatientform',
      views: {
        'chewy': {
          templateUrl: 'common/views/form.html'
        }
      }
    })
    .state('404', {
      url: '/404',
      views: {
        'chewy': {
          templateUrl: 'common/views/404.html'
        }
      }
    });

    $urlRouterProvider.otherwise('/home');
  })

  angular
  .module('moment', [])
  .factory('moment', function ($window) {
    return $window.moment;
  });
  angular
    .module('jquery', [])
    .factory('$', function ($window) {
      return $window.$;
    });

})();
