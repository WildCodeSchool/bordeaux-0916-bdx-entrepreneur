((app) => {

    app.component('membre', {
        bindings: {
            contact: "="
        },
        templateUrl: 'js/components/membre/membre.html',
        controller: [function() {


        }]
    })

})(angular.module('app.membre'))
