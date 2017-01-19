((app) => {
    app.component('companies', {
        bindings: {
            name: "<",
            sector: "<"
        },
        templateUrl: 'js/components/home/companies.html',
        controller: ['companiesService', '$stateParams', '$state', '$scope', '$mdDialog', function(companiesService, ngJsonExportExcel,$stateParams, $state, $scope, $mdDialog) {

                // adding request params : if filter by name or not
                if ($stateParams.name) {
                    companiesService.filter($stateParams).then((response) => {
                        this.companies = response.data
                        console.log(this.companies);
                    })

                } else {

                    companiesService.get().then((response) => {
                        this.companies = response.data
                        console.log(this.companies);

                    })

                }

                /*  ======================================
                      Add, Date & Load More Functions
                  ====================================== */

                let date = new Date();
                this.hhmm = (new Date(), 'hh:mm');


                this.carouselstate = 10
                this.loadMore = () => {
                    this.carouselstate += 6
                };

                /*  ======================================
                    For Card Styles
                    ====================================== */

                $scope.status = ' ';
                $scope.customFullscreen = false;

            }] //dont delete

    }); //dont delete
})(angular.module('app.home'))
