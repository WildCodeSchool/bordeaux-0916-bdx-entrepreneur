((app) => {

    app.service('companiesService', function($http) {
        return {
            get() {
                return $http.get('/api/companies');
            },
            getById(id) {
                return $http.get('/api/companies/' + id);
            },
            add(company) {
              debugger
                return $http.post('/api/companies', company)
            },

            filter(filtre) {

                if (!filtre.name)
                    delete filtre.name
                return $http.get('/api/companies', {
                    params: filtre
                })
            },
            delete(company) {
                return $http.delete('/api/companies/' + company._id);
            }
        }
    })

})(require('angular').module('app.services'));
