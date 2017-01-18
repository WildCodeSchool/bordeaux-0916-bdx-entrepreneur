((app) => {
  'use strict';
  app.component('dashboard', {
    templateUrl: 'js/components/dashboard/dashboard.html',
    controller: ['companiesService','usersService', function(companiesService, usersService) {

      companiesService.get().then((response) => {
          this.companies = response.data
      })

      usersService.get().then((response) => {
          this.users = response.data
      })

    }]
  })
})(angular.module('app.dashboard'))
