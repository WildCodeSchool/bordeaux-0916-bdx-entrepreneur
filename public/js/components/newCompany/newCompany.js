((app) => {
    app.component('newCompany', {
        templateUrl: 'js/components/newCompany/newCompany.html',
        controller: ['$stateParams', 'companiesService', '$state', function($stateParams, companiesService, $state) {
            angular.extend(this, {
                $onInit() {

                    this.infos = {}
                    this.infos.contacts = []

                },
                saveCompanies(company, tags, fondateur,contact, image) {
                  debugger
                    companiesService.upload(this.image)
                    this.infos.company = company
                    this.infos.company.image = `img/${this.image.name}`
                    this.infos.company.tags = [tags]
                    this.infos.fondateur = fondateur
                    this.infos.contacts.push(contact)
                    companiesService.add(this.infos).then((res) => {
                        this.newCompany = res.data
                        console.log(res.data);
                        $state.go("app.company({id: this.newCompany._id})")
                    }).catch(() => {

                    });
                }

            })
        }]
    });
})(angular.module('app.newCompany'))
