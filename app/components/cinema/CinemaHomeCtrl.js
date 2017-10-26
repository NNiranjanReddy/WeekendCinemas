function CinemaHomeCtrl($scope, $http,$state,RestAPI,constants) {
    var me = $scope;
    me.searchList = [];
    RestAPI.get(constants.endpoints.upcomingCinema).success(function(response) {
        me.upcomingCinemas = response.data ? response.data : [];
    }).error(function() {
        me.upcomingCinemas = [];
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

