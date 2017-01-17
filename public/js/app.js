((app) => {
//creation of our proper filter function
  app.filter('filterCompanyName', function(){
    return function(arr, name){
      if (!arr) return [];
      if (!name) return arr;
       return arr.filter(function(v){
        return v.name.toLowerCase().startsWith(name.toLowerCase())
      })
    }
  })
})(require('angular').module('app', [
    require('angular-ui-router'),
    require('angular-aria'),
    require('angular-animate'),
    require('angular-messages'),
    require('angular-material'),
    require('angular-cookies'),
    'app.config',
    'app.services',
    'app.login',
    'app.dashboard',
    'app.home',
    'app.admin',
    'app.company',
    'app.event'
]))
