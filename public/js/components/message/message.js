((app) => {
    app.component('message', {
        templateUrl: 'js/components/message/message.html',
        controller: ['usersService', '$state', function(usersService, $state) {
            angular.extend(this, {
                $onInit() {

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
                            this.email = {}
                        })
                    }
                }

            })
        }]
    })
})(angular.module('app.message'))
