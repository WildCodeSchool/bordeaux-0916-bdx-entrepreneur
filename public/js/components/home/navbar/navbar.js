((app) => {
    app.component('navbar', {
        templateUrl: 'js/components/home/navbar/navbar.html',
        controller: ['usersService', '$state', function(usersService, $state) {
            angular.extend(this, {
                $onInit() {

                    this.isAdmin = false

                    usersService.getCurrent().then((user) => {
                        this.currentUser = user
                        this.isAdmin = this.currentUser.isAdmin
                    }).catch(() => {
                        $state.go('login')
                    })

                },
                disconnect() {
                    usersService.disconnect().then(() => {
                        this.currentUser = null
                        $state.go('login')
                    })
                }
            })
        }]
    }); //dont delete
})(angular.module('app.navbar'))
