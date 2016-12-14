((app) => {

    app.service('companiesService', function($http) {
        return {
            get() {
                return $http.get('/api/companies');
            },
            getById(id) {
                return $http.get('/api/companies/' + id);
            },
            delete(company) {
                return $http.delete('/api/companies/' + company._id);
            },
            save(company) {
                if (!company._id) {
                    request = $http.post('/api/companies', company)
                } else {
                    request = $http.put('/api/companies/' + company._id, company)
                }
                return request
            }
        }
    })

})(require('angular').module('app.services'));
