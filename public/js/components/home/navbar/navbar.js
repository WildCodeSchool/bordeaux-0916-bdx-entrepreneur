((app) => {
    app.component('navbar', {
        templateUrl: 'js/components/home/navbar/navbar.html',
        controller: ['usersService', '$state', function(usersService, $state) {
            angular.extend(this, {
                $onInit() {

                    usersService.getCurrent().then((user) => {
                        this.currentUser = user
                        console.log(this.currentUser);
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
