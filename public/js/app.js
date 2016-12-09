((app) => {

})(require('angular').module( 'app', [
    require('angular-ui-router'),
    require('angular-material'),
    require('angular-aria'),
    require('angular-animate'),
    require('angular-messages'),
    'app.config',
    'app.services',
    'app.home',
    'app.member'
]))
