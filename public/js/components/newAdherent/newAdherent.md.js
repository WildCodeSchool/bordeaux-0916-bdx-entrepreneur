((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.newAdherent', {
            url: '/new/adherent',
            template: '<new-adherent></new-adherent>'
        })
    }])
})(angular.module('app.newAdherent', ['ui.router']));
