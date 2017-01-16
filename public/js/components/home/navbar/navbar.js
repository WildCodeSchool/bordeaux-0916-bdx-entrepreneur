((app) => {
    app.component('navbar', {
        templateUrl: 'js/components/home/navbar/navbar.html',
        controller: ['usersService', function(usersService) {
            usersService.getCurrent().then((user)=>{
              this.user = user
            })

        }]
    }); //dont delete
})(angular.module('app.home'))
