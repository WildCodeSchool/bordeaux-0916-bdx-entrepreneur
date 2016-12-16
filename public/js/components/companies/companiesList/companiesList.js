((app) => {
    app.component('companiesList', {
            templateUrl: 'js/components/companies/companiesList/companiesList.html',
                controller: function(companiesService,$scope,$mdDialog) {
                  companiesService.get().then((response) => {
                      this.companies = response.data
                    });

                    /*  ======================================
                          Add, Date & Load More Functions
                      ====================================== */

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

                    

              } //dont delete
        }); //dont delete
})(require('angular').module('app.company'))
