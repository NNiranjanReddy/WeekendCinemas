app.directive('jsonld', ['$filter', '$sce', function($filter, $sce) {
    return {
      restrict: 'E',
      template: function() {
        return '<script type="application/ld+json" ng-bind-html="getJson()"></script>';
      },
      scope: {
        json: '=json'
      },
      link: function(scope, element, attrs) {
        scope.getJson = function() {
          return $sce.trustAsHtml($filter('json')(scope.json));
        }
      },
      replace: true
    };
}]);