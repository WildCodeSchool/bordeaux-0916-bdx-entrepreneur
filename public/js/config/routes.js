((app) => {
    'use strict'
    app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/')
        $stateProvider.state('app', {
            url: '',
            abstract: true,
            template: '<ui-view></ui-view>'
        })
    }])

  })(require('angular').module('app.config'))




// ((app) => {
//     'use strict'
//     app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
//         // Define prefix
//         $locationProvider.hashPrefix('!');
//         // For each url not found redirection to '/'
//         $urlRouterProvider.otherwise('/company.list');
//         /*
//           Define a state with name 'app' this state is abstract and url is empty (root of application)
//           template is ui-view it's used to display nested views
//         */
//         $stateProvider.state('app', {
//                 url: '',
//                 abstract: true,
//                 template: '<navbar /><div class="container"><ui-view></ui-view></div>'
//             })
//             .state('callback', {
//                 url: '/auth/callback/:token',
//                 template: '',
//                 controller: ['usersService', '$stateParams', '$state', function(usersService, $stateParams, $state) {
//                     if ($stateParams.token) {
//                         usersService.setToken($stateParams.token).then((user) => {
//                             let toastContent = `Welcome ${user.name} !`
//                             Materialize.toast(toastContent, 4000, 'toast-success')
//                             $state.go('company.list')
//                         })
//                     } else {
//                         $state.go('company.list')
//                     }
//                 }]
//             })
//     }])
// })(require('angular').module('app.config'))
