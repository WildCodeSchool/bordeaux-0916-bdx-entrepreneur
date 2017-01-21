((app) => {
    app.component('companies', {
        templateUrl: 'js/components/home/companies.html',
        controller: ['companiesService', '$stateParams', '$state', '$scope', function(companiesService, ngJsonExportExcel, $stateParams, $state, $scope) {
            angular.extend(this, {
                $onInit() {
                    let date = new Date();
                    this.hhmm = (new Date(), 'hh:mm');
                    this.carouselstate = 10

                    companiesService.get().then((response) => {
                        this.companies = response.data
                    })

                },
                get() {
                    if (this.search.length > 0) {
                        companiesService.findOne(this.search).then((res) => {
                            this.companies = res.data
                        })
                    }
                },

                loadMore() {
                    this.carouselstate += 6
                }
            })
        }]
    });
})(angular.module('app.home'))
