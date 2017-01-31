((app) => {
    app.component('companies', {
        templateUrl: 'js/components/home/companies.html',
        controller: ['companiesService', '$stateParams', '$state', '$scope', '$window', 'usersService',
            function(companiesService, $stateParams, $state, $scope, $window, usersService, ngJsonExportExcel) {
            angular.extend(this, {
                $onInit() {

                    this.carouselstate = 9
                    this.isAdmin = false
                    companiesService.getActive().then((response) => {
                        this.companies = response.data
                        this.save = response.data
                    })

                    usersService.getCurrent().then((res) => {
                        this.user = res
                        this.isAdmin = this.user.isAdmin
                    }).catch((err) => {
                        $state.go('login').then(() => {
                            $state.reload()
                        })
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
