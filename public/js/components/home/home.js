((app) => {
  'use strict'
    app.component('home', {
        templateUrl: 'js/components/home/home.html',
        controller: ['contactsService', '$state', function(contactsService, $state) {
//fonction connect for authentification for ng-click
                // this.connect() {
                //   contactsService.connect(this.user).then((user) => {
                //     $state.go('app.company')
                //   })
                // }

                this.carouselstate = 3
                this.loadMore = () => {
                    this.carouselstate += 3

                };
          }]
    }); //dont delete
})(require('angular').module('app.home'))
