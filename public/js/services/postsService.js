((app) => {

    app.service('contactsService', function($http) {
        return {
            get(){
                return $http.get('/api/contacts');
            },
            getById(id){
                return $http.get('/api/contacts/' + id);
            },
            delete(company){
                return $http.delete('/api/contacts/' + company._id);
            },

            save(company){
                if (!company._id) {
                    request = $http.contact('/api/contacts', company)
                } else {
                    request = $http.put('/api/contacts/'+ company._id, company)
                }
                return request
            }
        }
    })

})(require('angular').module('app.services'));
