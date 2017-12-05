app.service('StringUtil', [function () {
	var StringUtil = function () {
		this.generateId = function (str) {
			return angular.lowercase(str.split(' ').join('-'));
		}
	};
	return new StringUtil();
}]);