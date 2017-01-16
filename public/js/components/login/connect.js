((app) => {
    'use strict'
    app.component('connect', {
        templateUrl: 'js/components/login/connect.html',
        controller: ['usersService', '$state', '$mdToast',function(usersService, $state,$mdToast) {
            let $ctrl = this
            angular.extend(this, {
                connect() {
                    usersService.connect($ctrl.user).then((user) => {
                        this.showSimpleToast = function() {

                            let pinTo = this.getToastPosition();
                            $mdToast.show(
                                $mdToast.simple()
                                .textContent(`Welcome ${user.name} !`)
                                .position("top bottom")
                                .hideDelay(4000)
                            );
                        };
                    }).catch((err) => {
                        let textContent = `Error : ${err.data} !`
                        Material.toast(textContent, 4000, 'toast-error')
                    })
                }
            })
        }]
    })
})(require('angular').module('app.login'))
