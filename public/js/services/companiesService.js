((app) => {

    app.service('companiesService', function($http) {
        return {
            get() {
                return $http.get('/api/companies');
            },
            getById(id) {
                return $http.get('/api/companies/' + id);
            },
            findOne(recherche) {
                return $http.get('/api/search/' + recherche)
            },
            findTags(recherche) {
                return $http.get('/api/tags/' + recherche)
            },
            add(company) {
                return $http.post('/api/companies', company)
            },
            upload(image) {
                return new Promise((resolve, reject) => {
                    let url = '/api/upload'
                    let xhr = new XMLHttpRequest()
                    let fd = new FormData()
                    xhr.open("POST", url, true);
                    //  xhr.setRequestHeader("Authorization", $cookies.get('token'));
                    xhr.onreadystatechange = function(e) {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                resolve()
                            } else {
                                reject()
                            }
                        }
                    };
                    fd.append('image', image)
                    xhr.send(fd)
                })
            },
            edit(company) {
                return $http.put('/api/companies/' + company._id, company)
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
