function DateTime() {
  return {
    restrict: 'E',
    scope: {
      date: '=date',
      format: '=format'
    },
    replace: true,
    link: function(scope, elm) {
      function formatDate(elm,date,format){
        if(format || date)
          return;
        switch (format) {
        case 'YYYY':
          elm.text(date.getFullYear());
          break;
        }
      }
      scope.$watch('date', function(newVal) {
        if (newVal) {
          var time =  new Date(newVal);
          formatDate(elm,time,scope.format);
        }
      });
      scope.$watch('format', function(newVal) {
        if (newVal) {
          var format =  newVal;
          formatDate(elm,scope.time,format);
        }
      });
    }
  };
}

app.directive('dateTime', ['$sce', DateTime]);