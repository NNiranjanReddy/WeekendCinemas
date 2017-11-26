app.service('StringUtil', [function () {
	var StringUtil = function () {
		this.generateId = function (str) {
			return angular.lowercase(str.split(' ').join('-'));
		}
	};
	return new StringUtil();
}]);

app.service('DateUtil', [function () {
	var StringUtil = function () {
		this.getMonth = function (month) {
			var monthStr = ""
			switch (month) {
				case 0: monthStr = 'Jan';
					break;
				case 1: monthStr = 'Feb';
					break;
				case 2: monthStr = 'Mar';
					break;
				case 3: monthStr = 'Apr';
					break;
				case 4: monthStr = 'May';
					break;
				case 5: monthStr = 'Jun';
					break;
				case 6: monthStr = 'Jul';
					break;
				case 7: monthStr = 'Aug';
					break;
				case 8: monthStr = 'Sep';
					break;
				case 9: monthStr = 'Oct';
					break;
				case 10: monthStr = 'Nov';
					break;
				case 11: monthStr = 'Dec';
					break;
			}
			return monthStr;
		};
	};
	return new StringUtil();
}]);