(function() {
  'use strict';
  angular
  .module('jett')
  .controller('CommonController', function(MainService, $state, $scope, $stateParams, $window) {

    var vm = this;

    // patient resources
    vm.download = function() {
    //  MainService.downloadForm();
      var url = $state.href('form');
      $window.open(url, "_blank");
    };

    vm.class="hide";

    vm.showInstructions = function() {
      if (vm.class === "hide") {
        vm.class = "show";
      } else {
        vm.class = "hide";
      }
    };


    // contact form
    vm.nameClass = "input";
    vm.emailClass = "input";
    vm.questionClass = "input";
    vm.confirmEmailClass = "input";

    vm.submit = function(submission) {
      if (submission == null) {
        vm.noName = true;
        vm.noEmail = true;
        vm.noQuestion = true;

        vm.nameClass = "error";
        vm.emailClass = "error";
        vm.questionClass = "error";

      } else if (submission.name == null) {

        vm.noName = true;
        vm.nameClass = "error";

      } else if (submission.email == null) {

        vm.noEmail = true;
        vm.emailClass = "error";

      } else if ((submission.confirmEmail == null)
        || (submission.email != submission.confirmEmail)) {

        vm.noConfirmEmail = true;
        vm.confirmEmailClass = "error";

      } else if (submission.question == null) {

        vm.noQuestion = true;
        vm.questionClass = "error";

      } else {
        MainService.sendEmail(submission).then(function(data, err) {
          if (data) {
            console.log(data);
            $state.go('result', {res: true});
          } else {
            console.log(err);
            console.log(data);
            $state.go('result', {res: false});
          }
        });
      }
    };

  })
  .controller('ServicesController', function($state) {
    var vm = this;

    vm.services = [
      {
        id: 0,
        name: "Hygiene and Periodontal Health",
        description: "Preventative care and maintenance"
      },
      {
        id: 1,
        name: "Restorative and Cosmetic",
        description: "Fillings, crowns/bridges, and whitening"
      },
      {
        id: 2,
        name: "Family Dentistry",
        description: "Pediatrics, adults, and geriatrics"
      },
      {
        id: 3,
        name: "TMJ",
        description: "Joint pain management, grinding, and night guards"
      },
      {
        id: 4,
        name: "Extractions",
        description: "Simple, surgical, and wisdom teeth"
      },
      {
        id: 5,
        name: "Sedation",
        description: "Oral and IV"
      },
      {
        id: 6,
        name: "Root Canal Therapy",
        description: "Anterior (front teeth) and molars"
      },
      {
        id: 7,
        name: "Implants",
        description: "Surgical placement and restorative"
      },
      {
        id: 8,
        name: "Dental Trauma",
        description: "Re-implanting avulsed teeth, splinting mobile teeth, and fabricating sports guards"
      }
    ];


  })
  .controller('ResultCtrl', function($state, $stateParams) {
    var vm = this;

    var result = $stateParams.res;
    console.log(result);

    if (result === 'true') {
      vm.message = "Thank you for your inqury. We plan on responding within 24 hours.";
    } else {
      vm.message = "Sorry, there was an error in the submission. Please try again later.";
    }

    setTimeout(function () {
      $state.go('home');
    }, 2000);

  });
})();
