function adminAutofocus() {
    return {
        restrict: 'A',
        scope: false,
        link: function($scope, $element, $attrs) {
            $scope.$watch($attrs.adminAutofocus, function(newValue, oldValue) {
                if (!newValue) {
                    return;
                } else {
                    setTimeout(function() {
                        $element[0].focus();
                    }, 100);
                }

            });
        }
    };
}


require('angular')
    .module('app.admin')
    .directive('adminAutofocus', adminAutofocus);
