((app) => {
    app.component('navbar', {
        templateUrl: 'js/components/home/navbar/navbar.html',
        controller: ['usersService', '$state', function(usersService, $state) {
            angular.extend(this, {
                $onInit() {

                    usersService.getCurrent().then((user) => {
                        this.currentUser = user
                        // console.log(this.currentUser);
                    }).catch(() => {
                        $state.go('app.login')
                    })

                },
                disconnect() {
                    usersService.disconnect().then(() => {
                        this.currentUser = null
                        $state.go('app.login').then(() => {
                            $state.reload()
                        })
                    })
                }
            })
        }]
    }); //dont delete
})(angular.module('app.navbar'))
