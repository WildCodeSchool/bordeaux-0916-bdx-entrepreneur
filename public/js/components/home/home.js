((app) => {
    app.component('home', {
        templateUrl: 'js/components/home/home.html',
        controller: function(contactsService) {

                this.carouselstate = 3
                this.loadMore = () => {
                    this.carouselstate += 3

                };
          }
    }); //dont delete
})(require('angular').module('app.home'))
