((app) => {
    'use strict'
    app.component('newAdherent', {
        templateUrl: 'js/components/newAdherent/newAdherent.html',
        controller: ['usersService', 'companiesService', '$state', function(usersService, companiesService, $state) {
            angular.extend(this, {
                $onInit() {

                    this.find = () => {
                        companiesService.get().then((res) => {
                            this.companies = res.data
                        })
                    }

                },
                add(user, search) {
                  debugger
                    let compagnie = this.companies.find((company) => {
                        return company.name === search
                    })
                    user.company = compagnie._id
                    usersService.add(user).then((res) => {
                        $state.go("app.login")
                    }).catch(() => {
                        console.log("Error adding user")
                    })
                }
            })
        }]
    })
})(angular.module('app.newAdherent'))
