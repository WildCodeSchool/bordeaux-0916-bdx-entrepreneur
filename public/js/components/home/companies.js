((app) => {
    app.component('companies', {
        templateUrl: 'js/components/home/companies.html',
        controller: ['companiesService', '$stateParams', '$state', '$scope', '$window', function(companiesService, ngJsonExportExcel, $stateParams, $state, $scope, $window) {
            angular.extend(this, {
                $onInit() {
                    this.carouselstate = 9
                    companiesService.get().then((response) => {
                        this.companies = response.data
                        this.save = response.data

                    })

                },

                get() {
                    if (this.search.length > 0) {
                        companiesService.findOne(this.search).then((res) => {
                            this.companies = res.data
                        })
                    } else {
                        this.companies = this.save
                    }
                },

                loadMore() {
                    this.carouselstate += 6
                }
            })
        }]
    });
})(angular.module('app.home'))
