(function() {
  'use strict';
  angular
  .module('admin',[
    'ui.router',
    'ngCookies'
  ])
  .config(function($stateProvider) {
    $stateProvider
    .state('admin', {
      url: '/admin',
      views: {
        'chewy': {
          templateUrl: 'admin/views/adminPanel.html',
          controller: 'AdminController as AdmCtrl'
        },
        'header': {
          templateUrl: 'admin/views/adminHeader.html',
          controller: 'AdmHeaderCtrl as AHCtrl'
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {
        'chewy': {
          templateUrl: 'admin/views/login.html',
          controller: 'LoginController as LgnCtrl'
        },
        'header': {
          templateUrl: 'admin/views/loginHeader.html'
        }
      }
    })
    .state('message', {
      url: '/message/:messageID',
      views: {
        'chewy': {
          templateUrl: 'admin/views/openMessage.html',
          controller: 'MessageController as MsgCtrl'
        },
        'header': {
          templateUrl: 'admin/views/adminHeader.html',
          controller: 'AdmHeaderCtrl as AHCtrl'
        }
      }
    });
  })
})();
