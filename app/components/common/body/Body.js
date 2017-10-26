function BodyDirective() {
  return {
    restrict: 'E',
    templateUrl: "app/components/common/body/Body.html"
  };
}
app.directive('home', [BodyDirective]);