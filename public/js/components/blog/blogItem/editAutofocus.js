function editAutofocus() {
    return {
        restrict: 'A',
        scope: false,
        link: function($scope, $element, $attrs) {
            $scope.$watch($attrs.editAutofocus, function(newValue, oldValue) {
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
    .module('app.blog')
    .directive('editAutofocus', editAutofocus);
