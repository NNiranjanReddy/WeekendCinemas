app.directive("owlCarousel", function () {
  return {
    restrict: 'E',
    transclude: false,
    link: function (scope) {
      scope.initCarousel = function (element) {
        var defaultOptions = {
          autoplay: true, autoplayTimeout:2000,rewind: true, dots: true, nav: true, responsive: {
            0: {
              items: 2
            },
            300: {
              items: 3
            },
            400: {
              items: 4
            },
            1000: {
              items: 10
            }
          }
        };
        var customOptions = scope.$eval($(element).attr('data-options'));
        for (var key in customOptions) {
          defaultOptions[key] = customOptions[key];
        }
        $(element).owlCarousel(defaultOptions);
      };
    }
  };
}).directive('owlCarouselItem', [function () {
  return {
    restrict: 'E',
    transclude: false,
    link: function (scope, element) {
      if (scope.$last) {
        scope.initCarousel(element.parent());
      }
    }
  };
}]);
