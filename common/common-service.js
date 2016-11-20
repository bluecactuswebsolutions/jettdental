(function() {
  'use strict';
  angular
  .module('jett')
  .factory('MainService', function($http) {

    var host = 'https://jettdental.com/api';

    var sendEmail = function(message) {
        var url = host + '/mail';
        return $http({
          method: 'POST',
          url: url,
          data: message,
          dataType: 'json',
          headers: {
            "Content-Type": "application/json"
          }
        });

    };

    return {
      sendEmail: sendEmail
    };

  });
})();
