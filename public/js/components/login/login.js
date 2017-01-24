((app) => {
    'use strict'
    app.component('login', {
        templateUrl: 'js/components/login/login.html',
        controller: ['usersService', '$state', function(usersService, $state) {
            angular.extend(this, {
                $onInit() {
                    usersService.getCurrent().then((res) => {
                        $state.go('app.home')
                    }).catch(() => {
                        $state.go('app.login')
                    })

                },
                connect(user) {
                    usersService.connect(user).then((user) => {
                        this.currentUser = user
                        $state.go('app.home').then(() => {
                            $state.reload()
                        })

                    }).catch((err) => {
                        let textContent = `Error : ${err.data} !`
                    })
                },
                newPassword(email){
                  usersService.getOne(email).then((res)=>{
                    console.log(res);
                  })
                }
            })
        }]
    })
})(angular.module('app.login'))
