app.directive('twitter', [ '$sce', TwitterDirective ]);

function TwitterDirective($sce) {
	return {
		restrict : 'A',
		templateUrl : 'app/components/common/directives/twitter/Twitter_directive.html',
		link :  {
			post : function(scope,ele,attr){
				console.log(attr);
			}
		}
	}
};
