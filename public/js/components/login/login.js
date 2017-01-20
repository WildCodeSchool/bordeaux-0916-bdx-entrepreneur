((app) => {
    'use strict'
    app.component('login', {
        templateUrl: 'js/components/login/login.html',
        controller: ['usersService', '$state', '$mdToast', function(usersService, $state, $mdToast) {
            let $ctrl = this
            angular.extend(this, {
                $onInit() {

                },
                connect(user) {
                    usersService.connect(user).then((user) => {
                      this.currentUser = user
                      $state.go('app.home')

                    }).catch((err) => {
                        let textContent = `Error : ${err.data} !`
                    })
                }
            })
        }]
    })
})(angular.module('app.login'))
