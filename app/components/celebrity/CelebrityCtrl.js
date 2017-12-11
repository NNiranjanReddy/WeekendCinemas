
function CelebrityCtrl($scope, RestAPI,$stateParams,constants,StringUtil) {
	var me = $scope;
	me.isLoading = true;
	me.celebrityId = $stateParams.celebrityId;
	
	me.getName = function(id){
		return StringUtil.generateName(id);
	}
	me.celebrityName = me.getName (me.celebrityId );
	RestAPI.get(constants.endpoints.getCelebrity+me.celebrityId).success(function (response) {
		me.filmography = response;
		me.isLoading = false;
	});

}
app.controller('CelebrityCtrl', ['$scope', 'RestAPI','$stateParams','constants','StringUtil', CelebrityCtrl]);
