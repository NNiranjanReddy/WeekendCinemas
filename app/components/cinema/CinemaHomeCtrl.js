function CinemaHomeCtrl($scope, $http,$state,RestAPI,constants) {
    var me = $scope;
    me.searchList = [];
    me.isLoading = true;
    RestAPI.get(constants.endpoints.upcomingCinema).success(function(response) {
        me.upcomingCinemas = response.data ? response.data : [];
        me.isLoading = false;
    }).error(function() {
        me.upcomingCinemas = [];
        me.isLoading = false;
    });
    me.searchCinema = function(){
        RestAPI.get(constants.endpoints.searchCinema+me.searchKey).success(function(response){
           me.searchList = response;
        }).error(function(){
           me.searchList.push(me.searchKey);
        });
    }
    me.filterNull = function(value, index, array){
        return true;
    }
}

app.controller('CinemaHomeCtrl', [ '$scope','$http','$state','RestAPI','constants',CinemaHomeCtrl ]);

