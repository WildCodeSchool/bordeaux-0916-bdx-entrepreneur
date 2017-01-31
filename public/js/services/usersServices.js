((app) => {
    'use strict'

    app.service('usersService', ['$http', '$cookies', '$window', '$q', function($http, $cookies, $window, $q) {
        return {

            get() {
                return $http.get('/api/users')
            },
            getPopulate(id) {
                return $http.get('/api/users/' + id)
            },
            getOne(user) {
                return $http.get('/api/users/one/' + user)
            },
            add(user) {
                return $http.post('/api/users', user)
            },
            edit(user) {
                return $http.put('/api/users/' + user._id, user)
            },

            delete(user) {
                return $http.delete('/api/users/' + user._id)
            },

            connect(data) {
                return $http.post('/api/admin', data).then((res) => {
                    $cookies.put('token', res.data.token)
                    return this.getCurrent();
                })
            },
            disconnect() {
                return new Promise((resolve, reject) => {
                    $cookies.remove("token")
                    this.currentUser = null
                    resolve()
                })
            },
            getCurrent() {
                let deferred = $q.defer()
                if (!$cookies.get('token')) {
                    deferred.reject()
                } else {
                    if (!this.currentUser) {
                        let payload = $cookies.get('token').split('.')[1]
                        payload = $window.atob(payload)
                        payload = JSON.parse(payload)
                        if (Math.round(new Date().getTime() / 1000) > payload.exp)
                            return this.disconnect()
                        this.getPopulate(payload._doc._id).then((res) => {
                            this.currentUser = res.data
                            deferred.resolve(this.currentUser)
                        })
                    } else {
                        deferred.resolve(this.currentUser)
                    }

                }

                return deferred.promise

            },
            send(message) {
                return $http.post('/api/message/send/', message)
            }
        }
    }])

})(angular.module('app.services'))
