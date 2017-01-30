((app) => {
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
    require('angular-cookies'),
    require('angular-toastr'),
    'ui.materialize',
    'app.config',
    'app.services',
    'app.login',
    'app.home',
    'app.company',
    'app.mycompany',
    'app.newCompany',
    'app.dashboard',
    'app.adherents',
    'app.navbar',
    'app.footer',
    'app.newAccount',
    'ngJsonExportExcel',
    'app.profile',
    'app.newAdherent',
    'app.membre',
    'app.message'
]))
