((app) => {
    'use strict'
    app.component('connect', {
        templateUrl: 'js/components/login/connect.html',
        controller: ['usersService', '$state', '$mdToast', function(usersService, $state, $mdToast) {
            let $ctrl = this
            angular.extend(this, {
                $onInit() {

                },
                connect() {
                    usersService.connect($ctrl.user).then((user) => {
                      this.currentUser = user
                    }).catch((err) => {
                        let textContent = `Error : ${err.data} !`
                    })
                }
            })
        }]
    })
})(require('angular').module('app.login'))
