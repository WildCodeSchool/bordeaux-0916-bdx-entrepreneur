((app) => {

})(require('angular').module('app', [
    require('angular-ui-router'),
    require('angular-aria'),
    require('angular-animate'),
    require('angular-messages'),
    require('angular-material'),
    require('angular-cookies'),
    'app.admin',
    'app.config',
    'app.services',
    'app.home',
    'app.navbar',
    'app.company',
    'app.event'
]))
