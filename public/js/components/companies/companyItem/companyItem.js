((app) => {
    app.component('companyItem', {
        templateUrl: 'js/components/companies/companyItem/companyItem.html',
        controller: function($stateParams, companiesService, $state, $mdToast) {

            if ($stateParams.id) {
                if ($stateParams.id === '_new') {
                    this.company = {
                        name: "Company Name",
                        sector: "Sector of Activity",
                        logo: "Company Logo",
                        twitter: "Write your twitter link here",
                        facebook: "Write your facebook link here",
                        linkedin: "Write your linkedin link here",
                        website: "Write your link to the company website here",
                        littleContent: "Synopsis of the company",
                        longContent: "Detailed Description of the company"
                  }
                } else {
                    companiesService.getById($stateParams.id).then((response) => {
                        this.company = response.data;
                    });
                }

            } else {
                $state.go('company.list')
            }

            companiesService.get().then((response) => {
                this.companies = response.data
            });

            this.next = () => {
                // find current company index in companies
                // with this index ++
                // with this new index re-affect this.company with this.companies[newINdex]
                let index = this.companies.findIndex((company) => company._id === this.company._id)
                index++
                let next_company = this.companies[index]
                $state.go('company.item', {
                    id: next_company._id
                })
            }


            this.prev = () => {
                let index = this.companies.findIndex((company) => company._id === this.company._id)
                index--
                let next_company = this.companies[index]
                $state.go('company.item', {
                    id: next_company._id
                })
            }


              this.delete = (company) => {
                companiesService.delete(company).then((response) => {
                    console.log('company deleted');
                    $state.go('company.list')
                })
            };

              this.saveCompanies = (company) => {
                companiesService.save(company).then((res) => {
                    //Si c'est new company alors $state.go item + id du nouveau
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Simple Toast!')
                        .position("bottom right")
                        .hideDelay(3000)
                    );
                     if($stateParams.id === '_new'){
                      $state.go('company.item',{id: res.data._id})
                    }
                }).catch(function(){
                  return res.status(500).json({
                      message: err.message
                  });
                }) ;
            }
            this.createCompanies = (company) => {
                companiesService.save(company).then((res) => {
                    console.log("Your Contact Has Been Saved and Updated")
                });
            }

            this.resetTodoState = () => {
                this.companies.forEach(function(company) {

                })
            };


            this.editMode = (company, index) => {
              this.company.editMode = true;
            };

            let date = new Date();
            this.hhmm = (new Date(), 'hh:mm');


        }
    }); //dont delete
})(require('angular').module('app.company'))
