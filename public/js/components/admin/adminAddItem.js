((app) => {
app.component('adminAddItem', {
    templateUrl: 'js/components/admin/adminAddItem.html',
    controller: function($stateParams, companiesService, $state, $mdToast, $mdDialog) {



        this.saveCompanies = (company) => {
            companiesService.save(company).then((res) => {
                //Si c'est new company alors $state.go item + id du nouveau
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Simple Toast!')
                    .position("bottom right")
                    .hideDelay(3000)
                );
                if ($stateParams.id === '_new') {
                    $state.go('company.item', {
                        id: res.data._id
                    });
                }
            }).catch(function() {

            });
        };
        this.createCompanies = (company) => {
            companiesService.save(company).then((res) => {
                console.log("Your Contact Has Been Saved and Updated");
            });
        };

        this.editMode = (company, index) => {
            this.company.editMode = true;
            this.company.editMode.onblur = this.saveCompanies;
        };

      this.tags = [];

      this.showPrompt = function(ev) {
     // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
      .title('Enter the associated social link')
      .textContent('Facebook, Linkedin, Twitter, etc.')
      .placeholder('Social Link')
      .ariaLabel('Social Link')
      .initialValue('')
      .targetEvent(ev)
      .ok('Okay!');

      $mdDialog.show(confirm).then(function(result) {
        this.status = 'Your social link ' + result + 'is registerd' + '.';
      }, function() {
        this.status = 'You didn\'t name your dog.';
      });
      };

      this.toolbar = {
       isOpen: false,
       count:0,
       selectedDirection: 'right'
     };




          } //dont delete
  }); //dont delete
})(require('angular').module('app.admin'))
