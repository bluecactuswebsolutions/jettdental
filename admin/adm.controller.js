(function() {
  'use strict';
  angular
  .module('admin')
  .controller('AdminController', function(AdminService, $state) {
    var vm = this;

    vm.messages = [];

    function setMessagesView() {
      vm.emptyBucket = false;
      AdminService.getMessages().then(function(data) {
        console.log(data);
        if (data.data) {
          if (data != null) {
            vm.messages = data.data;
            for (var i = 0; i < vm.messages.length; i++) {
              vm.messages[i].timeStamp = moment(vm.messages[i].timeStamp).format('MMMM Do YYYY, h:mm:ss a');
              vm.messages[i].encryptedData = JSON.parse(vm.messages[i].encryptedData);
            }
          } else {
            vm.emptyBucket = true;
          }
          if (vm.messages.length === 0) {
            vm.emptyBucket = true;
          }
        } else {
          $state.go('login');
        }
      }, function(err) {
        console.log(err);
        $state.go('login');
      });
    }

    angular.element(document).ready(function() {
      setMessagesView();
    });

    vm.delete = function(id) {
      AdminService.deleteMessage(id).then(function() {
        setMessagesView();
      });
    };

    vm.select = function(id) {
      AdminService.getMessage(id);
    };

  })
  .controller('LoginController', function(AdminService, $state, $cookies) {
    var vm = this;

    vm.resetAll = function() {
      vm.badEmail = false;
      vm.badPassword = false;
      vm.badLogin = false;
    };

    vm.login = function(credentials) {

      $cookies.remove('jettCookie');
      if (!credentials) {
        vm.badEmail = true;
      } else if (!credentials.email) {
        vm.badEmail = true;
      } else if (!credentials.password) {
        vm.badPassword = true;
      } else {
        AdminService.authenticate(credentials).then(function(data) {
          if (!data.data) {
            vm.badLogin = true;
          } else {

            $cookies.put('jettCookie', data.data);

            var checkCookie = new Promise(function(resolve,reject) {
              var cook = $cookies.get('jettCookie');
              if (cook != null) {
                resolve(cook);
              } else {
                reject('did not store cookie');
              }
            });

            checkCookie.then(function(data) {
              console.log('Cookie checked');
              $state.go('admin');
            }, function(err) {
              console.log(err);
            });

          }
        });
      }
    };


  })
  .controller('MessageController', function(AdminService, $state, $stateParams) {
    var vm = this;
    vm.message;
    vm.read='unread';

    var id = $stateParams.messageID;

    vm.readMessage = function() {
      vm.message.read = !vm.message.read;
      console.log(vm.message.read);
      AdminService.updateReadStatus(vm.message.read,id);
      if (!vm.message.read) {
        vm.read = 'read';
      } else {
        vm.read = 'unread';
      }
    };

    AdminService.getMessage(id).then(function(data) {
      if (data.data) {
        console.log('got it');
          vm.message = data.data;
          AdminService.updateReadStatus(true,id);
          vm.message.read = true;
        } else {
          $state.go('admin');
        }
    });
    vm.delete = function() {
      AdminService.deleteMessage(id).then(function(err,data) {
        if (err) {
          console.log(err);
        }
        $state.go('admin');
      });
    };

  })
  .controller('AdmHeaderCtrl', function($state, AdminService,$cookies) {
    var vm = this;
    vm.floatClass = '';
    vm.updateCreds = false;

    vm.openClose = function() {
      if (vm.floatClass === '') {
        vm.floatClass = 'floatIn';
      } else {
        vm.floatClass = '';
      }
    };

    vm.signOut = function() {
      $cookies.remove('jettCookie');
      AdminService.logOut();
      $state.go('login');
    };

    vm.updatePassword = function(creds) {
      if (!creds) {
        vm.badCreds=true;
      } else if (!creds.password) {
        vm.badNewPW=true;
      } else if (creds.password != creds.confirmPassword) {
        vm.badMatch= true;
      } else {
        AdminService.changePassword(creds.password).then(function(data) {
          if (data.data) {
            vm.signOut();
          } else {
            vm.broken=true;
          }
        });
      }
    };

  });
})();
