((app) => {
    app.component('companiesSearch', {
        bindings: {
            name: "=",
            sector: "="
        },
        templateUrl: 'js/components/companies/companiesList/companiesSearch.html',
        controller: ['companiesService', '$state', function(companiesService, $state) {

            // filer method is defined here
            // this.filter = (name) => {
            //     $state.go('company.list', {
            //         name: name
            //     })
            // }
        }]
    }); //dont delete
})(require('angular').module('app.company'))
