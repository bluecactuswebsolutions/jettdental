(function() {
  'use strict';
  angular
  .module('admin')
  .factory('AdminService', function($http, $cookies, $state, $stateParams) {

    function auth () {
      var jettCookie = $cookies.get('jettCookie');
      $http.defaults.headers.common['Authorization'] = jettCookie;
    }

    var host = 'https://jettdental.com/api';

    var getMessages = function() {
      auth();
      var url = host + '/all-messages';
      return $http.get(url);
    };

    var getMessage = function(id) {
      var param = {
        messageID: id
      };
      var url = host + '/get-message';
      return $http.post(url,param);
    };

    var deleteMessage = function(id) {
      var url = host + '/delete-message';
      return $http.post(url,{id: id});
    };

    var authenticate = function(credentials) {
      var url = host + '/login';
      return $http.post(url, credentials);
    };

    var updateReadStatus = function(readBool,id) {
      var url = host + '/update-message';
      var param = {
        messageID: id,
        read: readBool
      };
      return $http.post(url, param);
    };

    var logOut = function() {
      var url = host + '/logout';
      return $http.post(url,{token: jettCookie});
    };

    var changePassword = function(password) {
      var credentials = {
        newPassword: password
      };
      var url = host + '/update-admin';
      return $http.post(url,credentials);
    };


    return {
      getMessages: getMessages,
      getMessage: getMessage,
      deleteMessage: deleteMessage,
      authenticate: authenticate,
      updateReadStatus: updateReadStatus,
      logOut: logOut,
      changePassword: changePassword
    };

  });
})();
