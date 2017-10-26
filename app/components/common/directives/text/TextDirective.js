app.directive('text', [function() {
  return {
    restrict: 'E',
    scope: {
      text: '='
    },
    link: function(scope, element) {
      scope.$watch('text', function (newText) {
        if(newText){
          var paras = newText.split('\n');
          paras.forEach(function(para) {
            element.append(para+'<br>');
          }, this);
        }
      });
    }
  };
}]);