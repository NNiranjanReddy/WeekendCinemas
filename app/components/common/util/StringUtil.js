app.service('StringUtil', [function () {
	var StringUtil = function () {
		this.generateId = function (str) {
			return angular.lowercase(str.split(' ').join('-'));
		},
		this.capitalize = function(str) {
			var arr = [];
			str.split('-').forEach(function(element) {
				arr.push((element.charAt(0).toUpperCase()+element.slice(1)));
			});
			return arr.join(' ');
		},
		this.generateName = function(str){
			return this.capitalize(str);
		}
	};
	return new StringUtil();
}]);