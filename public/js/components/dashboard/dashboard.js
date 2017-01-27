((app) => {
    'use strict';
    app.component('dashboard', {
        templateUrl: 'js/components/dashboard/dashboard.html',
        controller: ['companiesService', 'usersService', function(companiesService, usersService) {
            angular.extend(this, {
                $onInit() {
                    companiesService.get().then((response) => {
                        this.companies = response.data
                    })

                    usersService.get().then((res) => {
                        this.users = res.data
                    })
                }
            })

        }]
    })
})(angular.module('app.dashboard'))
