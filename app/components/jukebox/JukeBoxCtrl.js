function JukeBoxCtrl($scope, $http, $stateParams, constants,RestAPI, $window ) {
	var me = $scope;

	RestAPI.get(constants.endpoints.jukeBox).success(function (response) {
		me.jukeBox  = response;
	}).error(function () {
		me.jukeBox = null;
	});

	$window.scrollTo(0, 0);
}

app.controller('JukeBoxCtrl', ['$scope', '$http', '$stateParams', 'constants', 'RestAPI', '$window', JukeBoxCtrl]);