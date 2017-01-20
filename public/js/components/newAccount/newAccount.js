((app) => {
    'use strict'
    app.component('newAccount', {
        templateUrl: 'js/components/newAccount/newAccount.html',
        controller: ['usersService', '$state', function(usersService, $state) {
            angular.extend(this, {
                $onInit() {

                },
                add(user) {
                    usersService.add(user).then((res) => {
                    //  $state.go("app.confirm")
                    }).catch(()=>{
                      console.log("Error adding user")
                    })
                }
            })
        }]
    })
})(angular.module('app.newAccount'))
