((app) => {
    app.component('message', {
        templateUrl: 'js/components/message/message.html',
        controller: ['usersService', function(usersService) {
            angular.extend(this, {
                $onInit() {

                    let allEmail = []
                    usersService.get().then((res) => {
                        res.data.map((e) => {
                            return allEmail.push(e.email)
                        })
                    })

                    this.send = (message) => {
                        message.to = allEmail
                        console.log(message);
                    }
                }

            })
        }]
    })
})(angular.module('app.message'))
