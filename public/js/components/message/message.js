((app) => {
    app.component('message', {
        templateUrl: 'js/components/message/message.html',
        controller: ['usersService', '$state', 'toastr', function(usersService, $state, toastr) {
            angular.extend(this, {
                $onInit() {

                    usersService.getCurrent().then((res) => {
                        if (!res.isAdmin)
                            $state.go('app.home')
                    })

                    let allEmail = []
                    usersService.get().then((res) => {
                        res.data.map((e) => {
                            return allEmail.push({
                                email: e.email,
                                name: `${e.firstname} ${e.name}`
                            })
                        })
                    })

                    this.send = (message) => {
                        message.to = allEmail
                        usersService.send(message).then(() => {
                            toastr.success('Messages Envoyés.', {
                                iconClass: 'toast-success'
                            })
                            this.email = {}
                        }).catch(() => {
                            toastr.error('Une erreur est survenue.', {
                                iconClass: 'toast-error'
                            })
                        })
                    }
                }

            })
        }]
    })
})(angular.module('app.message'))
