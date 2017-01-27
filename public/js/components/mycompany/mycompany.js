((app) => {
    app.component('mycompany', {
        templateUrl: 'js/components/mycompany/mycompany.html',
        controller: function($stateParams, usersService, companiesService, $state) {
            let copie = {};
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
        }
    }); //dont delete
})(angular.module('app.mycompany'))
