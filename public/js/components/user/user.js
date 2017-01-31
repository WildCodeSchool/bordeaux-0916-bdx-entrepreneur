((app) => {
    app.component('user', {
        templateUrl: 'js/components/user/user.html',
        controller: ['usersService', '$stateParams', 'companiesService', '$state', function(usersService, $stateParams, companiesService, $state) {
            angular.extend(this, {
                $onInit() {

                    this.showHints = true;
                    this.editMode = false
                    this.isAdmin = false

                    this.regions = ('Auvergne-Rhône-Alpes Bourgogne-Franche-Comté Bretagne Centre-Val-de-Loire Corse Grand-Est ' +
                        'Hauts-de-France Île-de-France Normandie Nouvelle-Aquitaine Occitanie Pays-de-la-Loire Provence-Alpes-Côte-d\'Azur ' +
                        'Guadeloupe Martinique Guyane La-Réunion Mayotte').split(' ').map((region) => {
                        return region
                    });

                    usersService.getPopulate($stateParams.id).then((res) => {
                        this.user = res.data
                        this.isAdmin = this.user.isAdmin
                    })
                },
                edit(user) {
                    if (this.image) {
                        companiesService.upload(this.image)
                        user.image = `img/${this.image.name}`
                    }
                    usersService.edit(user).then((res) => {
                        this.user = res.config.data
                        this.editMode = false
                    })
                }
            })
        }]
    })
})(angular.module('app.user'))
