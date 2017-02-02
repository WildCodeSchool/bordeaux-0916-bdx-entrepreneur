((app) => {
    'use strict'
    app.component('login', {
        templateUrl: 'js/components/login/login.html',
        controller: ['usersService', '$state', 'toastr', function(usersService, $state, toastr) {
            angular.extend(this, {
                connect(user) {
                    usersService.connect(user).then((user) => {
                        this.currentUser = user
                        $state.go('app.home').then(() => {
                            toastr.success('Connecté')
                            $state.reload()
                        })
                    }).catch((err) => {
                        toastr.error(`${err.data} !`)
                    })
                },
                newPassword(email) {
                    usersService.resetPassword(email).then((res) => {
                        this.email = false
                        toastr.success('Un email contenant votre nouveau mot de passe vous a été envoyé')
                    }).catch((err) => {
                        toastr.error(`${err.data} !`)
                    })
                }
            })
        }]
    })
})(angular.module('app.login'))
