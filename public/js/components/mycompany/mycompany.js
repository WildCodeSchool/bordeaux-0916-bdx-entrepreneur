((app) => {
    'use strict'
    app.component('mycompany', {
        templateUrl: 'js/components/mycompany/mycompany.html',
        controller: ['$stateParams', 'usersService', 'companiesService', '$state', function($stateParams, usersService, companiesService, $state) {
            angular.extend(this, {
                $onInit() {
                    this.companies = []
                    usersService.getCurrent().then((user) => {
                        this.user = user
                        return this.user.company.map((el) => {
                            this.companies.push(el.company)
                        })
                    })
                }
            })
        }]
    })
})(angular.module('app.mycompany'))
