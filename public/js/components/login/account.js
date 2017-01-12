((app) => {
    'use strict'
    app.component('account', {
        templateUrl: 'js/components/login/account.html',
        controller: ['usersService', '$state', function(usersService, $state) {
            let $ctrl = this
            angular.extend(this, {
              create(){
                usersService.create($ctrl.user).then((res) => {
                  return usersService.connect(res.data)

                  let pinTo = this.getToastPosition();
                    $mdToast.show(
                        $mdToast.simple()
                          .textContent(`Welcome ${user.name} !`)
                          .position("top bottom")
                          .hideDelay(4000)
                      );
                  }).then((user) => {
                  let toastContent = `Welcome ${user.name} !`
                  Material.toast(toastContent, 4000, 'toast-success')
                  $state.go('blog.list')
                }).catch((err) => {
                  let toastContent = `Error : ${err.data} !`
                  Material.toast(toastContent, 4000, 'toast-error')
                })
              }
            })
        }]
    })
})(require('angular').module('app.login'))
