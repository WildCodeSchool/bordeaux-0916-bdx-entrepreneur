((app) => {
    app.component('navbar', {
        templateUrl: 'js/components/home/navbar/navbar.html',
        controller: function(usersService){
          this.user = usersService.getCurrentUser()
        }

    }); //dont delete
})(angular.module('app.home'))
