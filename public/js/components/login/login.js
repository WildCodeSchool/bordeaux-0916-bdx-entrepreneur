((app) => {
    'use strict'
    app.component('login', {
        templateUrl: 'js/components/login/login.html',
        controller: ['usersService', '$state', function(usersService, $state) {
            angular.extend(this, {
                $onInit() {

                    this.form = true

                },
                connect(user) {
                    usersService.connect(user).then((user) => {
                        this.currentUser = user
                        $state.go('app.home').then(() => {
                            $state.reload()
                        })

                    }).catch((err) => {
                        this.error = `Error : ${err.data} !`
                    })
                },
                newPassword(email) {
                    this.email = false
                    this.error = null
                    usersService.getOne(email).then((res) => {
                        this.sent = true
                    })
                }
            })
        }]
    })
})(angular.module('app.login'))
