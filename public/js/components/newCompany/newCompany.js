((app) => {
    app.component('newCompany', {
        templateUrl: 'js/components/newCompany/newCompany.html',
        controller: ['$stateParams', 'companiesService', '$state', '$mdToast', '$mdDialog', function($stateParams, companiesService, $state, $mdToast, $mdDialog) {
                angular.extend(this, {
                    $onInit() {

                        this.infos = {}

                        this.toolbar = {
                            isOpen: false,
                            count: 0,
                            selectedDirection: 'right'
                        };


                    },
                    saveCompanies(company, fondateur, cofond, cofondbis, image) {
                        companiesService.upload(this.image)
                        this.infos.company = company
                        this.infos.company.image = `img/${this.image.name}`
                        this.infos.fondateur = fondateur
                        this.infos.cofond = cofond
                        this.infos.cofondbis = cofondbis
                        companiesService.add(this.infos).then((res) => {
                            this.newCompany = res.data
                            console.log(this.newCompany);
                        }).catch(() => {

                        });
                    },
                    createCompanies(company) {
                        companiesService.save(company).then((res) => {
                            console.log("Your Contact Has Been Saved and Updated");
                        });
                    }

                })
            }] //dont delete
    }); //dont delete
})(angular.module('app.newCompany'))
