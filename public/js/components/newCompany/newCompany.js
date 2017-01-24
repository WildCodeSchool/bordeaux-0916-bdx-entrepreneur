((app) => {
    app.component('newCompany', {
        templateUrl: 'js/components/newCompany/newCompany.html',
        controller: ['$stateParams', 'companiesService', '$state', function($stateParams, companiesService, $state) {
            angular.extend(this, {
                $onInit() {
                    this.contacts = []
                },
                saveCompanies(company, tags, image) {
                    companiesService.upload(this.image)
                    this.infos.company = company
                    this.infos.company.image = `img/${this.image.name}`
                    this.infos.company.tags = [tags]
                    companiesService.add(this.infos).then((res) => {
                        this.newCompany = res.data
                        console.log(res.data);
                        $state.go("app.company({id: this.newCompany._id})")
                    }).catch(() => {

                    });
                },
                addUser(){
                    this.contacts.push({})
                }

            })
        }]
    });
})(angular.module('app.newCompany'))
