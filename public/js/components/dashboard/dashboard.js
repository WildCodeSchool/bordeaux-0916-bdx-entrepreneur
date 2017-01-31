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
                },
                disable(user) {
                    user.active = false
                    usersService.edit(user).then((res) => {
                        console.log(res);
                    })
                },
                activate(user) {
                    user.active = true
                    usersService.edit(user).then((res) => {
                        console.log(res);
                    })
                },
                disableCompany(company) {
                    company.active = false
                    companiesService.edit(company).then((res) => {
                        console.log(res);
                    })
                },
                activateCompany(company) {
                    company.active = true
                    companiesService.edit(company).then((res) => {
                        console.log(res);
                    })
                }
            })
        }]
    })
})(angular.module('app.dashboard'))
