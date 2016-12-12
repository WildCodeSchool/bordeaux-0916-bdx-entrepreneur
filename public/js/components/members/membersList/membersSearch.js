((app) => {
    app.component('membersSearch', {
        templateUrl: 'js/components/members/membersList/membersSearch.html',

        controller: function(contactsService, $timeout, $scope, $q, $element) {

                contactsService.get().then((response) => {
                    this.contacts = response.data
                });
                /*  ======================================
                Search by Multiple Sectors
                ====================================== */

                $scope.sectors = ["Marketing", "Consulting","Communications","Information Tech", "Real Estate", "Stock Trading", "Investing"];
                     $scope.selectedSector;
                     $scope.getSelectedText = function() {
                       if ($scope.selectedSector !== undefined) {
                         return "You have selected: Info Tech " + $scope.selectedSector;
                       } else {
                         return "Please select an item";
                       }
                     };

          /*  ======================================
              Search by Sector Input
              ====================================== */

                let ctrl = $scope;
                ctrl.user = null;
                ctrl.users = null;

                ctrl.loadUsers = function() {

                    // Use timeout to simulate a 650ms request.
                    return $timeout(function() {

                        ctrl.users =  [{
                            id: 1,
                            name: 'IT'
                        }, {
                            id: 2,
                            name: 'Communications'
                        }, {
                            id: 3,
                            name: 'Marketing'
                        }, {
                            id: 4,
                            name: 'Consulting'
                        }, {
                            id: 5,
                            name: 'Accounting'
                        }];

                    }, 650);
                };






                /*  ======================================
                      Add, Date & Load More Functions
                  ====================================== */


                this.add = (contact) => {
                    this.contacts.push(this.contacts),
                        console.log('this has been added');
                };

                let date = new Date();
                this.hhmm = (new Date(), 'hh:mm');


                this.carouselstate = 3
                this.loadMore = () => {
                    this.carouselstate += 3
                };



            } //dont delete
    }); //dont delete
})(require('angular').module('app.member'))


/*this.carouselstate = 0

  this.next = () => {
      this.carouselstate ==
          this.members.length - 1 ?
          this.carouselstate = 0 :
          this.carouselstate++
          console.log('search next members');
  }

  this.prev = () => {
      this.carouselstate < 1 ?
          this.carouselstate =
          this.members.length - 1 :
          this.carouselstate--;
      console.log('search prev member');
  }*/
