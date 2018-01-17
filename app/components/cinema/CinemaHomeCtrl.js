function CinemaHomeCtrl($scope, $rootScope,$state,RestAPI,constants) {
    var me = $scope;
    me.isLoading = true;
    me.loaderTotalCount = 1;
    me.loaderCount = 0;
    
    me.showOrHideLoader = function() {
        me.loaderCount++;
        if (me.loaderTotalCount == me.loaderCount) {
          me.isLoading = false;
        }
    }
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

app.controller('CinemaHomeCtrl', [ '$scope','$rootScope','$state','RestAPI','constants',CinemaHomeCtrl ]);

