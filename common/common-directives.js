(function() {
  'use strict';
  angular
  .module('jett')
  .directive('slider', function() {
    return {
      restrict: 'E',
      templateUrl: 'common/views/slider.html',
      link: function(scope,el,attr) {



      },
      controller: function($scope, $interval) {

        var classes = [
          'img1', 'img2', 'img3', 'img4', 'img5'
        ];
        var idx = 0;
        $scope.class = classes[idx];

        $interval(function() {
          if (idx === 4) {
            idx = 0;
          } else {
            idx += 1;
          }
          $scope.class = classes[idx];
        }, '8000');

        $scope.switch = function(direction) {
          if (direction === 'left') {
            if (idx === 0)
            { idx = 4; }
            else {
              idx -= 1;
            }
          }
          else { //right
            if (idx === 4) {
              idx = 0;
            }
            else {
              idx += 1;
            }
          }
          $scope.class = classes[idx];
        };

      }
    };
  })
  .directive('barNav', function() {
    return {
      restrict: 'E',
      templateUrl: 'common/views/barNav.html',
      link: function(scope,el,attr) {

      },
      controller: function($scope, $window, $state) {

         $scope.checkState = function() {
          if ($state.current.name === "home") {
            $scope.home = "currPage";
            $scope.staff = "";
            $scope.services="";
            $scope.resources="";
            $scope.contact="";
          } else if ($state.current.name === "staff") {
            $scope.home = "";
            $scope.staff = "currPage";
            $scope.services="";
            $scope.resources="";
            $scope.contact="";
          } else if ($state.current.name === "services") {
            $scope.home = "";
            $scope.staff = "";
            $scope.services="currPage";
            $scope.resources="";
            $scope.contact="";
          } else if ($state.current.name === "resources") {
            $scope.home = "";
            $scope.staff = "";
            $scope.services="";
            $scope.resources="currPage";
            $scope.contact="";
          } else if (($state.current.name === "contact")
            || ($state.current.name === "result")) {
            $scope.home = "";
            $scope.staff = "";
            $scope.services="";
            $scope.resources="";
            $scope.contact="currPage";
          }
        };

      }
    };
  })
  .directive('mobileHeader', function($state) {
    return {
      restrict: 'E',
      templateUrl: 'common/views/mobileHeader.html',
      link: function(scope,el,attr) {

        scope.navPosition = false;

        scope.slideNav = function() {
          scope.navPosition = !scope.navPosition;
          if (scope.navPosition) {
            scope.class = "navActive";
          } else {
            scope.class = "";
          }
        };

        var pages = [scope.home, scope.staff, scope.services, scope.resources, scope.contact];
        var state = $state.current.name;

        for (var i = 0; i < pages.length; i++) {
          pages[i] = "";
        }

        if (state === "home") {
          scope.home = "currPage";
        } else if(state === "staff") {
          scope.staff = "currPage";
        } else if(state === "resources") {
          scope.resources === "currPage";
        } else if (state ==="services") {
          scope.services = "currPage";
        } else if(state === "contact") {
          scope.contact = "currPage";
        }

      }
    };
  })
  .directive('newPatient', function($window) {
    return {
      restrict: 'E',
      templateUrl: 'common/views/PDF_file.html',
      link: function(scope,el,attr) {
        el.css('height', $window.height + 'px');
      },
      controller: function($scope, $window, $state) {
        $window.print();
      }
    };
  })
  .directive('footer', function() {
    return {
      restrict: 'E',
      templateUrl: 'common/views/footer.html',
      link: function(scope,el,attr) {},
      controller: function($scope, $window) {}
    };
  })
  .directive('media', function() {
    return {
      restrict: 'E',
      templateUrl: 'common/views/media.html',
      link: function(scope, el, attr) {},
      controller: function($scope) {}
    };
  })
  .directive('serviceItem', function() {
    return {
      restrict: 'E',
      templateUrl: 'common/views/serviceItem.html',
      scope: {
        text: '@'
      },
      link: function(scope, el, attr) {
      },
    };
  });
})();
