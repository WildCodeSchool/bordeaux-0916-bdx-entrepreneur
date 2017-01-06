((app) => {

    app.service('usersService', function($http) {
        return {
            getCurrentUser(){
              return {
                _id: "azzaqsqs",
                name: "MOURGUES",
                isAdmin: false
              }
            }
        }
    })

})(require('angular').module('app.services'));
