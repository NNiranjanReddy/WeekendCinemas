function TimeDiff($sce) {
  return {
    restrict: 'E',
    scope: {
      date: '='
    },
    templateUrl: '',
    replace: true,
    link: function (scope, elm) {
      scope.$watch('date', function (newVal) {
        if (newVal) {
          var startDate = new Date();
          var endDate = new Date(newVal);
          var timeStart = startDate.getTime();
          var timeEnd = endDate.getTime();
          var diffMs = (timeStart - timeEnd);
          var diffYears = Math.abs(Math.round((diffMs / (60 * 60 * 24)) / 365.25));
          var diffMonths = monthDiff(endDate, startDate)
          var diffDays = Math.floor(diffMs / 86400000); // days
          var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
          var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
          if (diffMonths > 0) {
            elm.text(diffMonths + ' months')
          } else if (diffDays > 0) {
            elm.text(diffDays + ' days');
          } else if (diffHrs > 0) {
            elm.text(diffHrs + ' hours');
          } else if (diffMins > 0) {
            elm.text(diffMins + ' min');
          } else {
            elm.text((diffMs / 1000) + ' sec');
          }
        }
        function monthDiff(d1, d2) {
          var months;
          months = (d2.getFullYear() - d1.getFullYear()) * 12;
          months -= d1.getMonth() + 1;
          months += d2.getMonth();
          return months <= 0 ? 0 : months;
        }
      });
    }
  };
}

app.directive('timeDiff', ['$sce', TimeDiff]);