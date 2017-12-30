function PostCtrl($scope, $http, $stateParams, $location, constants, $window, $rootScope) {
	var me = $scope;
	me.found = true;
	me.isLoading = true;
	me.commentsUrl =$location.absUrl();
	me.pluginOn = true;
	me.rendering = false;
	me.rendered = function () {
	  me.rendering = false;
	};
	me.$watch('pluginOn', function (newVal, oldVal) { 
	  if (newVal !== oldVal) {
		me.rendering = true;
	  }
	});
	me.$on('$routeChangeSuccess', function () {
	  me.rendering = true;
	});
	$scope.share = function(){
		FB.ui(
		{
			method: 'feed',
			name: 'This is the content of the "name" field.',
			link: 'myLink',
			picture: 'http://www.hyperarts.com/external-xfbml/share-image.gif',
			caption: "caption",
			description: 'This is the content of the "description" field, below the caption.',
			message: ''
		});
	  }
	var GET = $http({
		method: 'GET',
		url: constants.api.url + '/post/' + $stateParams.postName
	});
	GET.success(function (response) {
		me.article = response ? response : null;
		me.found = true;
		me.isLoading = false;
		me.url = $location.absUrl();
		$rootScope.pageTitle = response.local.ttl;
		$rootScope.pageDesc = response.local.text;
		$rootScope.pageImg = response.type == 'News' ? response.media.img[0] :
			'https://i.ytimg.com/vi/' + response.media.video[0] + '/mqdefault.jpg';
	});
	GET.error(function () {
		me.article = null;
		me.found = false;
		me.isLoading = false;
	});

	$window.scrollTo(0, 0);
}

app.controller('PostCtrl', ['$scope', '$http', '$stateParams', '$location', 'constants', '$window', '$rootScope', PostCtrl]);