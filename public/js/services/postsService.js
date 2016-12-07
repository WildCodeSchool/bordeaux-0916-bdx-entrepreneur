((app) => {

    app.service('contactsService', function($http) {
        return {
            get(){
                return $http.get('/api/contacts');
            },
            getById(id){
                return $http.get('/api/contacts/' + id);
            },
            delete(member){
                return $http.delete('/api/contacts/' + member._id);
            },

            save(member){
                if (!member._id) {
                    request = $http.contact('/api/contacts', member)
                } else {
                    request = $http.put('/api/contacts/'+ member._id, member)
                }
                return request
            }
        }
    })

})(require('angular').module('app.services'));
