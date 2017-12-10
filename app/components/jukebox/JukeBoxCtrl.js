function JukeBoxCtrl($scope, $http, $stateParams, constants,RestAPI, $window ) {
	var me = $scope;
	me.isLoading = true;
	RestAPI.get(constants.endpoints.jukeBox).success(function (response) {
		me.jukeBox  = response;
		me.isLoading = false;
	}).error(function () {
		me.jukeBox = null;
		me.isLoading = false;
	});

	$window.scrollTo(0, 0);
}

app.controller('JukeBoxCtrl', ['$scope', '$http', '$stateParams', 'constants', 'RestAPI', '$window', JukeBoxCtrl]);