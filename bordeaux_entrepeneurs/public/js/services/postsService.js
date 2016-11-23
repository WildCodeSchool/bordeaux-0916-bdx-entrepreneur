((app) => {

    app.service('postsService', function($http) {
        return {
            get(){
                return $http.get('/api/posts');
            },
            getById(id){
                return $http.get('/api/posts/' + id);
            },
            delete(blog){
                return $http.delete('/api/posts/' + blog._id);
            },

            save(blog){
                if (!blog._id) {
                    request = $http.post('/api/posts', blog)
                } else {
                    request = $http.put('/api/posts/'+ blog._id, blog)
                }
                return request
            }
        }
    })

})(angular.module('app.services'));
