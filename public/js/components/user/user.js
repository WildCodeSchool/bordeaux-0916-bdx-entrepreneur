((app) => {
    app.component('user', {
        templateUrl: 'js/components/user/user.html',
        controller: ['usersService', '$stateParams', 'companiesService', '$state', 'toastr', function(usersService, $stateParams, companiesService, $state, toastr) {
            angular.extend(this, {
                $onInit() {

                    this.editMode = false
                    this.isAdmin = false

                    this.regions = ('Auvergne-Rhône-Alpes Bourgogne-Franche-Comté Bretagne Centre-Val-de-Loire Corse Grand-Est ' +
                        'Hauts-de-France Île-de-France Normandie Nouvelle-Aquitaine Occitanie Pays-de-la-Loire Provence-Alpes-Côte-d\'Azur ' +
                        'Guadeloupe Martinique Guyane La-Réunion Mayotte').split(' ').map((region) => {
                        return region
                    });

                    usersService.getPopulate($stateParams.id).then((res) => {
                        this.user = res.data

                        companiesService.getActive().then((allcompanies) => {
                            this.allcompanies = allcompanies.data.filter((company) => {
                                return !(this.user.company.find(e => e.company._id === company._id))
                            })
                        })
                    })

                    usersService.getCurrent().then((response) => {
                        this.isAdmin = response.isAdmin
                    })


                },
                edit(user, newCompany) {

                    if (this.image) {
                        companiesService.upload(this.image)
                        user.image = `img/${this.image.name}`
                    }
                    if (newCompany) {
                        user.newCompany = []
                        newCompany.forEach((e) => {
                            user.newCompany.push({
                                company: JSON.parse(e)
                            })
                        })
                    }
                    console.log(user);
                    usersService.edit(user).then((res) => {
                        this.user = res.config.data
                        this.editMode = false
                        toastr.success('Profil enregistré')
                    })
                },
                archive(user) {
                    user.active = false
                    usersService.edit(user).then(() => {
                        $state.go('app.home')
                        toastr.info('Profil archivé')
                    })
                }
            })
        }]
    })
})(angular.module('app.user'))
