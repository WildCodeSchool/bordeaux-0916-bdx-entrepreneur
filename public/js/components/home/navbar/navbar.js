((app) => {
    app.component('navbar', {
        templateUrl: 'js/components/home/navbar/navbar.html',
        controller: ['usersService', '$state', function(usersService, $state) {

            usersService.getCurrent().then((user) => {
                this.user = user

            }).catch(() => {
                $state.go('login.connect')
            })
            angular.extend(this, {
                $onInit() {


                },
                disconnect() {
                    usersService.disconnect().then(() => {
                        $state.go('login.connect')
                    })
                }
            })
        }]
    }); //dont delete
})(angular.module('app.navbar'))
