((app) => {
    app.component('companyItem', {
        templateUrl: 'js/components/companies/companyItem/companyItem.html',
        controller: function($stateParams, contactsService, $state, $scope) {

            contactsService.getById($stateParams.id).then((response) => {
                this.company = response.data;
            });

            contactsService.get().then((response) => {
                this.companies = response.data;
                /*console.log(this.companies);*/
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
                contactsService.delete(company).then((response) => {
                    console.log('company deleted');
                    $state.go('company.list')
                })
            };

            this.saveCompanies = (company) => {
                contactsService.save(company).then((res) => {
                    console.log("Your Contact Has Been Saved")
                });
            }
            this.createCompanies = (company) => {
                contactsService.save(company).then((res) => {
                    console.log("Your Contact Has Been Saved and Updated")
                });
            }

            this.resetTodoState = () => {
                this.companies.forEach(function(company) {

                })
            }

            this.editMode = (company, index) => {
                this.company.editMode = true;
            };

            let date = new Date();
            this.hhmm = (new Date(), 'hh:mm');


            $scope.isOpen = false;

            $scope.demo = {
                isOpen: false,
                count: 0,
                selectedDirection: 'right'
            };








        }
    }); //dont delete
})(require('angular').module('app.company'))



/*this.carouselstate = 0

  this.next = () => {
      this.carouselstate ==
          this.company.length - 1 ?
          this.carouselstate = 0 :
          this.carouselstate++
          console.log('search next company');
  }

  this.prev = () => {
      this.carouselstate < 1 ?
          this.carouselstate =
          this.company.length - 1 :
          this.carouselstate--;
      console.log('search prev company');
  }*/
