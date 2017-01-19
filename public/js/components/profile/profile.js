((app) => {
    app.component('profile', {
        templateUrl: 'js/components/profile/profile.html',
        controller: ['$stateParams', 'usersService', 'companiesService', '$state',function($stateParams, usersService, companiesService, $state) {
            angular.extend(this, {
                $onInit() {

                    this.showHints = true;

                    this.regions = ('Auvergne-Rhône-Alpes Bourgogne-Franche-Comté Bretagne Centre-Val-de-Loire Corse Grand-Est ' +
                        'Hauts-de-France Île-de-France Normandie Nouvelle-Aquitaine Occitanie Pays-de-la-Loire Provence-Alpes-Côte-d\'Azur ' +
                        'Guadeloupe Martinique Guyane La-Réunion Mayotte').split(' ').map(function(state) {
                        return {
                            abbrev: state
                        };
                    });

                    usersService.getCurrent().then((res) => {
                        this.currentUser = res
                        companiesService.getById(this.currentUser.company).then((res) => {
                            this.company = res.data
                        })
                    })


                },
                edit(user) {
                  debugger
                    usersService.edit(user).then((res) => {
                        this.currentUser = res.config
                        $state.reload()
                    })
                }
            })
        }]
    });
})(angular.module('app.profile'))
