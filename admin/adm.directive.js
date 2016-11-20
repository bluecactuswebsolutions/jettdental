(function() {
  'use strict';
  angular
  .module('admin')
  .directive('messageBar', function($state) {
    return {
      restrict: 'E',
      templateUrl: 'admin/views/messageBlock.html',
      scope: {
        msg: '='
      },
      link: function($scope, el, attr) {
        var id = $scope.msg._id;
        
        if (!$scope.msg.read) {
          $scope.checkClass = 'unread';
        } else {
          $scope.checkClass = '';
        }
        el.on('click', function() {
          $state.go('message',{messageID:id});
        });
      }
    };
  })
})();
