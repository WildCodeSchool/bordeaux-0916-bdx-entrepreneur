((app) => {
    app.component('newCompany', {
        templateUrl: 'js/components/newCompany/newCompany.html',
        controller: ['$stateParams', 'companiesService', '$state', 'usersService', function($stateParams, companiesService, $state, usersService) {
            angular.extend(this, {
                $onInit() {
                    usersService.getCurrent().then((res) => {
                        if (!res.isAdmin)
                            $state.go('app.home')
                    })
                    this.infos = {}
                    this.contacts = []

                    usersService.get().then((allusers) => {
                        this.allusers = allusers.data
                    })
                },
                saveCompanies(company, contacts, image, newUser) {
                    companiesService.upload(this.image)
                    if (this.image) company.image = `img/${this.image.name}`
                    this.infos.company = company
                    this.infos.contacts = contacts
                    if (newUser && contacts) {
                        newUser.forEach((el) => {
                            this.infos.contacts.push(JSON.parse(el))
                        })
                    } else if (newUser && !contacts){
                        this.infos.contacts = []
                        newUser.forEach((el) => {
                            this.infos.contacts.push(JSON.parse(el))
                        })
                    }

                    companiesService.add(this.infos).then((res) => {
                        this.newCompany = res.data
                        $state.go("app.home")
                    }).catch((err) => {
                        console.log(err)
                    })
                },
                addUser() {
                    this.contacts.push({})
                }

            })
        }]
    });
})(angular.module('app.newCompany'))
