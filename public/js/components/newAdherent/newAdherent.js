((app) => {
    'use strict'
    app.component('newAdherent', {
        templateUrl: 'js/components/newAdherent/newAdherent.html',
        controller: ['usersService', 'companiesService', '$state', function(usersService, companiesService, $state) {
            angular.extend(this, {
                $onInit() {

                    this.founder = false

                    usersService.getCurrent().then((res) => {
                        if (!res.isAdmin)
                            $state.go('app.home')
                    })

                    this.find = () => {
                        companiesService.get().then((res) => {
                            this.companies = res.data
                        })
                    }

                },
                add(user, search, founder) {
                    if (search) {
                        user.company = []
                        let compagnie = this.companies.find((company) => {
                            return company.name === search
                        })

                        user.company.push({
                            compagny: compagnie._id,
                            role: founder
                        })
                    }

                    usersService.add(user).then((res) => {
                        $state.go("app.home")
                    }).catch(() => {
                        console.log("Error adding user")
                    })
                }
            })
        }]
    })
})(angular.module('app.newAdherent'))
