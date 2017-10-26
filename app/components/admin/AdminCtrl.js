function AdminCtrl($scope, $rootScope, constants, StringUtil, RestAPI) {
    var scope = $scope;
    scope.media = {};
    scope.media.video = [];
    scope.media.img = [];
    scope.createId = function (name) {
        return name ? StringUtil.generateId(name) : name;
    }
    scope.submitPost = function (form) {
        form.media = scope.media;
        form._id = scope.createId(scope.name);
        var jsonData = angular.toJson(form)
        var url = constants.endpoints.post + form._id;
        RestAPI.post(url, jsonData).success(function (response) {
            scope.postSuccess = response;
            window.location = '/post/'+form._id;
        }).error(function () {
            console.log('error');
        });
    }
    scope.addPostMedia = function (media) {
        if ($rootScope.postVideoType.indexOf(scope.post.type) != -1 && scope.media.video.indexOf(media) == -1) {
            scope.media.video.push(media);
        } else if (scope.media.img.indexOf(media) == -1) {
            scope.media.img.push(media);
        }
    }
}

app.controller('AdminCtrl', ['$scope', '$rootScope', 'constants', 'StringUtil', 'RestAPI', AdminCtrl]);

