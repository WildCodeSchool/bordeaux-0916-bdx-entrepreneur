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

                },
                saveCompanies(company, contacts, image) {
                    companiesService.upload(this.image)
                    if (this.image) company.image = `img/${this.image.name}`
                    this.infos.company = company
                    this.infos.contacts = contacts
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
