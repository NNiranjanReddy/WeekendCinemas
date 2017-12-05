
function CelebrityCtrl($scope, RestAPI,$stateParams,constants) {
	var me = $scope;
	me.isLoading = true;
	me.celebrityId = $stateParams.celebrityId;
	RestAPI.get(constants.endpoints.getCelebrity+me.celebrityId).success(function (response) {
		me.filmography = response;
		me.isLoading = false;
	});

}
app.controller('CelebrityCtrl', ['$scope', 'RestAPI','$stateParams','constants', CelebrityCtrl]);
