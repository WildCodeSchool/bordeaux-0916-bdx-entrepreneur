((app) => {
    app.component('footer', {
        templateUrl: 'js/components/home/footer/footer.html',
        controller: ['companiesService', 'usersService', function(companiesService, usersService) {
            angular.extend(this, {
                $onInit() {
                    usersService.getCurrent().then((user) => {
                        this.currentUser = user
                    })
                    companiesService.get().then((response) => {
                        this.companies = response.data
                    })
                }
            })
        }]
    });
})(angular.module('app.footer'))
