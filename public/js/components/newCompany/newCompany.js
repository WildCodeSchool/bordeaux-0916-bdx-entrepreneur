((app) => {
    app.component('newCompany', {
        templateUrl: 'js/components/newCompany/newCompany.html',
        controller: ['$stateParams', 'companiesService', '$state', function($stateParams, companiesService, $state) {
            angular.extend(this, {
                $onInit() {
                    this.infos = {}
                    this.contacts = []

                },
                saveCompanies(company, tags, contacts, image) {
                    companiesService.upload(this.image)
                    if (this.image) company.image = `img/${this.image.name}`
                    this.infos.company = company
                    this.infos.company.tags = [tags]
                    this.infos.contacts = contacts
                    companiesService.add(this.infos).then((res) => {
                        this.newCompany = res.data
                        console.log(res)
                            //  $state.go("app.company({id: this.newCompany._id})")
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
