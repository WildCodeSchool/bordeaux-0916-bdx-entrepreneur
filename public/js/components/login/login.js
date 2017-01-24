((app) => {
    'use strict'
    app.component('login', {
        templateUrl: 'js/components/login/login.html',
        controller: ['usersService', '$state', function(usersService, $state) {
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
