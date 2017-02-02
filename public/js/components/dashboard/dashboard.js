((app) => {
    'use strict';
    app.component('dashboard', {
        templateUrl: 'js/components/dashboard/dashboard.html',
        controller: ['companiesService', 'usersService', '$state', 'toastr', function(companiesService, usersService, $state, toastr) {
            angular.extend(this, {
                $onInit() {
                    usersService.getCurrent().then((res) => {
                        if (!res.isAdmin)
                            $state.go('app.home')
                    })

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
                      toastr.info('Utilisateur désactivé')
                        // console.log(res);
                    })
                },
                activate(user) {
                    user.active = true
                    usersService.edit(user).then((res) => {
                      toastr.info('Utilisateur activé')
                        // console.log(res);
                    })
                },
                disableCompany(company) {
                    company.active = false
                    companiesService.edit(company).then((res) => {
                      toastr.info('Société désactivé')
                        // console.log(res);
                    })
                },
                activateCompany(company) {
                    company.active = true
                    companiesService.edit(company).then((res) => {
                      toastr.info('Société activé')
                        // console.log(res);
                    })
                }
            })
        }]
    })
})(angular.module('app.dashboard'))
