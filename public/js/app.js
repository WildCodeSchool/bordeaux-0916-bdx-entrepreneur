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

  const file = [() => {
    return {
        restrict: 'E',
        template: '<input type="file">',
        replace: true,
        transclude: true,
        require: 'ngModel',
        link(scope, element, attr, ctrl) {

            if (!attr.class && !attr.ngClass) {
                element.addClass('btn');
            }

            let listener = () => {
                scope.$apply(() => {
                    attr.multiple ? ctrl.$setViewValue(element[0].files) : ctrl.$setViewValue(element[0].files[0])
                });
            }
            element.bind('change', listener)
        }
    }
}]

app.directive('file', file)

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
    'app.home',
    'app.admin',
    'app.company',
    'app.newCompany',
    'app.dashboard',
    'app.event',
    'app.adherents',
    'app.navbar',
    'app.footer'
]))
