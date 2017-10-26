app.service('RestAPI', ['$http', RestAPI]);
function RestAPI($http) {
    var restApi = function () {
        this.get = function (url) {
            return $http({
                method: 'GET',
                url: url
            });
        };
        this.post = function (url, jsonData) {
            return $http({
                method: 'POST',
                url: url,
                data: jsonData,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    };
    return new restApi();
}
