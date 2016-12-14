((app) => {
    app.component('companiesList', {
            templateUrl: 'js/components/companies/companiesList/companiesList.html',
                controller: function(contactsService,$scope,$mdDialog) {
                  contactsService.get().then((response) => {
                      this.contacts = response.data
                    });

                    /*  ======================================
                          Add, Date & Load More Functions
                      ====================================== */


                    this.add = (contact) => {
                        this.contacts.push(this.contacts),
                            console.log('this has been added');
                    };


                    let date = new Date();
                    this.hhmm = (new Date(), 'hh:mm');


                    this.carouselstate = 6
                    this.loadMore = () => {
                        this.carouselstate += 6
                    };

                    /*  ======================================
                        For Card Styles
                        ====================================== */

                    $scope.status = ' ';
                    $scope.customFullscreen = false;

                    $scope.showAdvanced = function(ev) {
                        $mdDialog.show({
                                controller: DialogController,
                                templateUrl: 'dialog1.tmpl.html',
                                parent: angular.element(document.body),
                                targetEvent: ev,
                                clickOutsideToClose: true,
                                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                            })
                            .then(function(answer) {
                                $scope.status = 'You said the information was "' + answer + '".';
                            }, function() {
                                $scope.status = 'You cancelled the dialog.';
                            });
                    };




              } //dont delete
        }); //dont delete
})(require('angular').module('app.company'))
