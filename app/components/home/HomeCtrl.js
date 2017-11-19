function HomeCtrl($scope, $rootScope, RestAPI, $window, constants, $interval) {
  var me = $scope;
  me.posts = [];
  me.videos = [];
  me.news = [];
  me.isLoading = true;
  me.loaderTotalCount = 3;
  me.loaderCount = 0;

 

  var GET = RestAPI.get(constants.api.url + '/posts');
  GET.success(function(response) {
    me.posts = response ? response : [];
    me.posts.forEach(function(post, index, array) {
      if (constants.postVideoType.indexOf(post.type) != -1) {
        me.videos.push(post);
      } else if (['News'].indexOf(post.type) != -1) {
        me.news.push(post);
      }
    });
    me.showOrHideLoader();
  });
  GET.error(function() {
    me.posts = [];
  });

  var GET = RestAPI.get(constants.api.url + '/upcomingCinemas');
  GET.success(function(response) {
    me.upcomingCinemas = response.data ? response.data : [];
    $rootScope.upcomingCinemas = me.upcomingCinemas;
    me.showOrHideLoader();
  });
  GET.error(function() {
    me.upcomingCinemas = [];
  });

  var GET = RestAPI.get(constants.api.url + '/recentCinemas');
  GET.success(function(response) {
    me.recentCinemas = response.data ? response.data : [];
    me.showOrHideLoader();
  });
  GET.error(function() {
    me.recentCinemas = [];
  });
  me.showOrHideLoader = function() {
    me.loaderCount++;
    if (me.loaderTotalCount == me.loaderCount) {
      me.isLoading = false;
    }
  }
}

app.controller('HomeCtrl', ['$scope', '$rootScope', 'RestAPI', '$window',
    'constants', HomeCtrl]);
