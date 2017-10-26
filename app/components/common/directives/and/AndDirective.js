function And($sce) {
  return {
    restrict: 'E',
    scope: {
      list: '='
    },
    replace: true,
    link: function (scope, elm) {
      scope.$watch('list', function (newList) {
        if (newList) {
          if (newList.length >= 2) {
            var copy = angular.copy(newList);
            var lastElm = copy.pop();
            if (angular.isObject(lastElm)) {
              var copyName = [];
              copy.forEach(function (element) {
                copyName.push(element.name);
              }, this);
              elm.text(copyName.join().concat(" and ").concat(lastElm.name));
            }
            else {
              elm.text(copy.join().concat(" and ").concat(lastElm));
            }

          }
          else {
            if (newList && angular.isObject(newList[0])) {
              elm.text(newList[0].name);
            }
            else {
              elm.text(newList.join());
            }

          }
        }
      });
    }
  }
}

app.directive('and', ['$sce', And]);