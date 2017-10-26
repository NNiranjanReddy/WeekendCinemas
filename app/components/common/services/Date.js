app.service('DateUtil',[function(){
	var DateUtil = function(){
		this.toYYYY_MM_DD = function(date){
			return date.toISOString().split('T')[0];
		};
	};
	return new DateUtil();
}]);