((app) => {
    'use strict'
    app.component('newAccount', {
        templateUrl: 'js/components/newAccount/newAccount.html',
        controller: ['usersService', '$state', function(usersService, $state) {
            let $ctrl = this
            angular.extend(this, {
                $onInit() {

                },
                create() {
                    usersService.create($ctrl.user).then((res) => {
                        debugger
                    }).catch(()=>{
                      console.log("Error adding user")
                    })
                }
            })
        }]
    })
})(angular.module('app.newAccount'))
