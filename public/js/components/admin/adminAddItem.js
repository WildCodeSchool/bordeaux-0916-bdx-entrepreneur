((app) => {
    app.component('adminAddItem', {
        templateUrl: 'js/components/admin/adminAddItem.html',
        controller: [function($stateParams, companiesService, $state, $mdToast) {

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
                    return res.status(500).json({
                        message: err.message
                    });
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

          }]
        }); //dont delete
})(require('angular').module('app.admin'))
