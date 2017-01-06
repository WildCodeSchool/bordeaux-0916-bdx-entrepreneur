((app) => {
    'use strict'
    app.component('adminAddMenu', {
        bindings: {
            onSave: "&"
        },
        templateUrl: 'js/components/admin/adminAddMenu.html'
    })
})(require('angular').module('app.admin'))
