((app) => {
    app.component('navbar', {
        templateUrl: 'js/components/home/navbar/navbar.html',
        controller: ['usersService', '$state', function(usersService, $state) {
            angular.extend(this, {
                $onInit() {

                    usersService.getCurrent().then((user) => {
                        this.user = user
                    }).catch(() => {
                        $state.go('app.login')
                    })

                },
                disconnect() {
                    usersService.disconnect().then(() => {
                        $state.go('app.login')
                    })
                }
            })
        }]
    }); //dont delete
})(angular.module('app.navbar'))
