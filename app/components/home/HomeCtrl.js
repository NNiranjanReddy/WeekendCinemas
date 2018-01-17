function HomeCtrl($scope, $rootScope, RestAPI, $window, constants, $interval) {
  var me = $scope;
  me.posts = [];
  me.videos = [];
  me.weekendcinemaPosts = [];
  me.isLoading = true;
  me.loaderTotalCount = 2;
  me.loaderCount = 0;

  me.showOrHideLoader = function() {
    me.loaderCount++;
    if (me.loaderTotalCount == me.loaderCount) {
      me.isLoading = false;
    }
  }

  var GET = RestAPI.get(constants.api.url + '/posts');
  GET.success(function(response) {
    me.posts = response ? response : [];
    me.posts.forEach(function(post, index, array) {
      if (constants.postVideoType.indexOf(post.type) != -1) {
        me.videos.push(post);
      } else if (['weekendcinema'].indexOf(post.type) != -1) {
        me.weekendcinemaPosts.push(post);
      }
    });
    me.showOrHideLoader();
  });
  GET.error(function() {
    me.posts = [];
  });
  if( $rootScope.cinemas ){
    me.cinemas = $rootScope.cinemas;
    me.showOrHideLoader();
  }
  else{
      RestAPI.get(constants.endpoints.getCinemas).success(function (response) {
        me.cinemas  = response.data;
        $rootScope.cinemas = me.cinemas;
        me.showOrHideLoader();
      }).error(function () {
            me.cinemas  = [];
            $rootScope.cinemas = me.cinemas;
            me.showOrHideLoader();
      });
  }  
}

app.controller('HomeCtrl', ['$scope', '$rootScope', 'RestAPI', '$window',
    'constants', HomeCtrl]);
