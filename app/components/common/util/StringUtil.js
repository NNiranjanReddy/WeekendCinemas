app.service('StringUtil', [function () {
	var StringUtil = function () {
		this.generateId = function (str) {
			return angular.lowercase(str.split(' ').join('-'));
		},
		this.capitalize = function(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		},
		this.generateName = function(str){
			return this.capitalize(str.replace("-", " "));
		}
	};
	return new StringUtil();
}]);