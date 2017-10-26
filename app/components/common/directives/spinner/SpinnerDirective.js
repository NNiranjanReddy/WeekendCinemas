app.directive('spinner', [function() {
    return {
      restrict: 'E',
      scope: {
        show: '='
      },
      templateUrl:'app/components/common/directives/spinner/Spinner.html',
      link: function(scope, element) {
        
      }
    };
}]);