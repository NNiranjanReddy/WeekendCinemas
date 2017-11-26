function PostCtrl($scope, $http, $stateParams, $location,constants,$window,$rootScope) {
	$scope.found = true;
	$scope.isLoading = true;
	if($scope.$parent.posts && $scope.$parent.posts.length>0){
		$scope.$parent.posts.forEach(function (item, index) {
			if(item._id === $stateParams.postName){
				$scope.article = item;
				$scope.isLoading = false;
			}
		});
	}else{
		var GET = $http({
			method : 'GET',
			url : constants.api.url + '/post/' + $stateParams.postName
		});	
		GET.success(function(response) {
			$scope.article = response ? response : null;
			$scope.found = true;
			$scope.isLoading = false;
			$scope.url =  $location.absUrl();
			$rootScope.pageTitle = response.local.ttl;
			$rootScope.pageDesc = response.local.text;
			$rootScope.pageImg = response.type == 'News' ? response.media.img[0]:
			'https://i.ytimg.com/vi/'+response.media.video[0]+'/mqdefault.jpg';
		});
		GET.error(function() {
			$scope.article = null;
			$scope.found = false;
			$scope.isLoading = false;
		});
	}
	$window.scrollTo(0, 0);
}

app.controller('PostCtrl',['$scope','$http', '$stateParams','$location', 'constants','$window','$rootScope',PostCtrl]);