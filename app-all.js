var app = angular.module("WcApp", ['ui.router', 'ui.calendar']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'app/components/home/Home.html',
    controller: 'HomeCtrl'
  }).state('post', {
    url: '/post/:postName',
    templateUrl: 'app/components/post/Post.html',
    controller: 'PostCtrl'
  }).state('jukebox', {
    url: '/jukebox',
    templateUrl: 'app/components/jukebox/JukeBox.html',
    controller: 'JukeBoxCtrl'
  }).state('shortfilms', {
    url: '/shortfilms',
    templateUrl: 'app/components/shortfilms/ShortFilm.html',
    controller: 'ShortFilmCtrl'
  }).state('cinemas', {
    url: '/cinemas',
    templateUrl: 'app/components/cinema/CinemaHome.html',
    controller: 'CinemaHomeCtrl'
  }).state('cinema', {
    url: '/cinema/:cinemaName',
    templateUrl: 'app/components/cinema/Cinema.html',
    controller: 'CinemaCtrl'
  }).state('celebrities', {
    url: '/celebrities',
    templateUrl: 'app/components/celebrity/CelebrityHome.html',
    controller: 'CelebrityHomeCtrl'
  }).state('celebrity', {
    url: '/celebrity/:celebrityName',
    templateUrl: 'app/components/celebrity/Celebrity.html',
    controller: 'CelebrityCtrl'
  }).state('calendar', {
    url: '/calendar',
    templateUrl: 'app/components/calendar/CalendarHome.html',
    controller: 'CalendarHomeCtrl'
  }).state('privacy', {
    url: '/privacy',
    templateUrl: 'app/components/privacy/privacy.html',
    controller: 'PrivacyCtrl'
  }).state('terms', {
    url: '/terms',
    templateUrl: 'app/components/terms/Terms.html',
    controller: 'TermsCtrl'
  }).state('admin', {
    url: '/admin',
    templateUrl: 'app/components/admin/Admin.html',
    controller: 'AdminCtrl'
  });
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  //$mdThemingProvider.theme('default').primaryPalette('green').accentPalette('pink');
});

app.run(['$rootScope', '$state', '$stateParams', 'constants',
  function ($rootScope, $state, $stateParams, constants) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.postVideoType = constants.postVideoType;
    $rootScope.postType = angular.copy($rootScope.postVideoType);
    $rootScope.postType.push('News');
    $rootScope.date = new Date();
  }]);

app.constant('constants', {
  api: {
    url: '/v1'
  },
  endpoints: {
    loadCinema: '/v1/cinema/',
    searchCinema: '/v1/searchCinema/',
    upcomingCinema: '/v1/upcomingCinemas',
    jukeBox: '/v1/jukeBox',
    post: '/v1/post/'
  },
  postVideoType: ['Teaser', 'Trailer', 'Stumper', 'Prelude','Promo Song']
});
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


function CalendarHomeCtrl($rootScope, $scope, RestAPI, constants, $compile, uiCalendarConfig, DateUtil) {

  /* event source that contains custom events on the scope */
  $scope.events = {
    events: []
  };
  $scope.isLoading = true;
  $scope.numberOfItems = 3;
  $scope.loadedItem = 0;

  if ($rootScope.upcomingCinemas) {
    addCinemas($rootScope.upcomingCinemas);
  } else {
    var GET = RestAPI.get(constants.api.url + '/upcomingCinemas');
    GET.success(function (response) {
      addCinemas((response.data ? response.data : []));
    });
  }
  if ($rootScope.recentCinemas) {
    addCinemas($rootScope.recentCinemas);
  } else {
    var GET = RestAPI.get(constants.api.url + '/recentCinemas');
    GET.success(function (response) {
      addCinemas((response.data ? response.data : []));
    });
  }
  var GET = RestAPI.get(constants.api.url + '/jukebox');
  GET.success(function (response) {
    addCinemas((response ? response : []));
  });

  function createCalendar() {
    $scope.eventRender = function (event, element, view) {
      element.attr({
        'tooltip': event.title,
        'tooltip-append-to-body': true
      });
      switch (event.type) {
        case 'cinema': element.prepend('<i class="material-icons small color-CINEMA">panorama</i>');
          break;
        case 'music': element.prepend('<i class="material-icons small color-MUSIC">queue_music</i>');
          break;
      }
      $compile(element)($scope);
    };
    /* configuration object */
    $scope.uiConfig = {
      calendar: {
        height: 450,
        editable: true,
        defaultView: mobilecheck() ? "listMonth" : "month",
        /*      defaultView:'basicWeek',*/
        header: {
          right: 'today,prev,next',
          left: 'title',
          center: 'Weekend Cinema Calendar'
        },
        eventRender: $scope.eventRender
      }
    };

    /* event sources array */
    $scope.eventSources = [$scope.events];

  };
  function addCinemas(cinemas) {
    cinemas.forEach(function (cinema) {
      if (cinema.general && cinema.general.releaseDt) {
        var event = {};
        event.title = cinema.name;
        event.start = DateUtil.toYYYY_MM_DD(new Date(cinema.general.releaseDt));
        event.url = "/cinema/" + cinema.cinemaId;
        event.type = "cinema";
        $scope.events.events.push(event);
      }
      else if (cinema.songs) {
        var event = {};
        event.title = cinema.name;
        event.start = DateUtil.toYYYY_MM_DD(new Date(cinema.songs.releaseDt));
        event.url = "/cinema/" + cinema.cinemaId;
        event.type = "music";
        $scope.events.events.push(event);
      }
    });
    $scope.loadedItem++;
    if ($scope.loadedItem == $scope.numberOfItems) {
      createCalendar();
      $scope.isLoading = false;
    }
  }

  function mobilecheck() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

}

app.controller('CalendarHomeCtrl', ['$rootScope', '$scope', 'RestAPI', 'constants', '$compile', 'uiCalendarConfig',
  'DateUtil', CalendarHomeCtrl]);

app.controller('CelebrityCtrl',['$scope',CelebrityCtrl]);

function CelebrityCtrl($scope) 
{ 
	$scope.message = "Welcome to Celebrity page";
}

function CelebrityHomeCtrl($scope, $http) {
}

app.controller('CelebrityHomeCtrl', [ '$scope', '$http',CelebrityHomeCtrl ]);


function CinemaCtrl($scope, $http, $stateParams, RestAPI, constants) {
	me = $scope;
	me.cinemaName = $stateParams.cinemaName;
	me.isLoading = true;
	me.currentSong = null;
	me.found = true;
	me.setCurrentSong = function (val) {
		me.currentSong = val;
	};
	RestAPI.get(constants.endpoints.loadCinema + me.cinemaName).success(function (response) {
		me.cinema = response || null;
		if (me.cinema.songs) {
			if (me.cinema.songs.youtubeUrl) {
				me.currentSong = me.cinema.songs.youtubeUrl;
			} else if (me.cinema.songs.list.length) {
				me.currentSong = me.cinema.songs.list[0].youtubeUrl;
			}
		}
		me.currentVideo = me.cinema.videos ? me.cinema.videos.find(function(video){
			video.type === 'Trailer';
		}): null;
		me.director = me.cinema.people.crew ? me.cinema.people.crew.find(function (cel) {
			return cel.type === 'Director';
		}) : me.cinema.people.find(function (cel) {
			return cel.type === 'Director';
		});

		me.producer = me.cinema.people.crew ? me.cinema.people.crew.find(function (cel) {
			return cel.type === 'Producer';
		}) : me.cinema.people.find(function (cel) {
			return cel.type === 'Producer';
		});
		me.people = me.cinema.people.cast ? me.cinema.people.cast.concat(me.cinema.people.crew) : me.cinema.people;
		$('.tabs').tabs();
		me.isLoading = false;
	}).error(function () {
		me.cinema = null;
		me.isLoading = false;
	});

}
app.controller('CinemaCtrl', ['$scope', '$http', '$stateParams', 'RestAPI', 'constants', CinemaCtrl]);


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


function BodyDirective() {
  return {
    restrict: 'E',
    templateUrl: "app/components/common/body/Body.html"
  };
}
app.directive('home', [BodyDirective]);
function And($sce) {
  return {
    restrict: 'E',
    scope: {
      list: '='
    },
    replace: true,
    link: function (scope, elm) {
      scope.$watch('list', function (newList) {
        if (newList) {
          if (newList.length >= 2) {
            var copy = angular.copy(newList);
            var lastElm = copy.pop();
            if (angular.isObject(lastElm)) {
              var copyName = [];
              copy.forEach(function (element) {
                copyName.push(element.name);
              }, this);
              elm.text(copyName.join().concat(" and ").concat(lastElm.name));
            }
            else {
              elm.text(copy.join().concat(" and ").concat(lastElm));
            }

          }
          else {
            if (newList && angular.isObject(newList[0])) {
              elm.text(newList[0].name);
            }
            else {
              elm.text(newList.join());
            }

          }
        }
      });
    }
  }
}

app.directive('and', ['$sce', And]);
app.directive("owlCarousel", function () {
  return {
    restrict: 'E',
    transclude: false,
    link: function (scope) {
      scope.initCarousel = function (element) {
        var defaultOptions = {
          autoplay: true, autoplayTimeout:2000,rewind: true, dots: true, nav: true, responsive: {
            0: {
              items: 2
            },
            300: {
              items: 3
            },
            400: {
              items: 4
            },
            1000: {
              items: 10
            }
          }
        };
        var customOptions = scope.$eval($(element).attr('data-options'));
        for (var key in customOptions) {
          defaultOptions[key] = customOptions[key];
        }
        $(element).owlCarousel(defaultOptions);
      };
    }
  };
}).directive('owlCarouselItem', [function () {
  return {
    restrict: 'E',
    transclude: false,
    link: function (scope, element) {
      if (scope.$last) {
        scope.initCarousel(element.parent());
      }
    }
  };
}]);

app.directive('spinner', [function() {
    return {
      restrict: 'E',
      scope: {
        show: '='
      },
      templateUrl:'app/components/common/directives/spinner/Spinner.html',
      link: function(scope, element) {
        
      }
    };
}]);
app.directive('text', [function() {
  return {
    restrict: 'E',
    scope: {
      text: '='
    },
    link: function(scope, element) {
      scope.$watch('text', function (newText) {
        if(newText){
          var paras = newText.split('\n');
          paras.forEach(function(para) {
            element.append(para+'<br>');
          }, this);
        }
      });
    }
  };
}]);
app.directive('myCurrentTime', ['$interval', function($interval) {
  // return the directive link function. (compile function not needed)
  return function(scope, element, attrs) {
    var stopTime; // so that we can cancel the time updates

    // used to update the UI
    function updateTime() {
      element.text(new Date());
    }

    stopTime = $interval(updateTime, 1000);

    // listen on DOM destroy (removal) event, and cancel the next UI update
    // to prevent updating time after the DOM element was removed.
    element.on('$destroy', function() {
      $interval.cancel(stopTime);
    });
  };
}]);
function DateTime() {
  return {
    restrict: 'E',
    scope: {
      date: '=date',
      format: '=format'
    },
    replace: true,
    link: function(scope, elm) {
      function formatDate(elm,date,format){
        if(format || date)
          return;
        switch (format) {
        case 'YYYY':
          elm.text(date.getFullYear());
          break;
        }
      }
      scope.$watch('date', function(newVal) {
        if (newVal) {
          var time =  new Date(newVal);
          formatDate(elm,time,scope.format);
        }
      });
      scope.$watch('format', function(newVal) {
        if (newVal) {
          var format =  newVal;
          formatDate(elm,scope.time,format);
        }
      });
    }
  };
}

app.directive('dateTime', ['$sce', DateTime]);
function TimeDiff($sce) {
  return {
    restrict: 'E',
    scope: {
      date: '='
    },
    templateUrl: '',
    replace: true,
    link: function (scope, elm) {
      scope.$watch('date', function (newVal) {
        if (newVal) {
          var startDate = new Date();
          var endDate = new Date(newVal);
          var timeStart = startDate.getTime();
          var timeEnd = endDate.getTime();
          var diffMs = (timeStart - timeEnd);
          var diffYears = Math.abs(Math.round((diffMs / (60 * 60 * 24)) / 365.25));
          var diffMonths = monthDiff(endDate, startDate)
          var diffDays = Math.floor(diffMs / 86400000); // days
          var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
          var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
          if (diffMonths > 0) {
            elm.text(diffMonths + ' months')
          } else if (diffDays > 0) {
            elm.text(diffDays + ' days');
          } else if (diffHrs > 0) {
            elm.text(diffHrs + ' hours');
          } else if (diffMins > 0) {
            elm.text(diffMins + ' min');
          } else {
            elm.text((diffMs / 1000) + ' sec');
          }
        }
        function monthDiff(d1, d2) {
          var months;
          months = (d2.getFullYear() - d1.getFullYear()) * 12;
          months -= d1.getMonth() + 1;
          months += d2.getMonth();
          return months <= 0 ? 0 : months;
        }
      });
    }
  };
}

app.directive('timeDiff', ['$sce', TimeDiff]);
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

app.directive('myYoutube', ['$sce', YoutubeDirective]);

function YoutubeDirective($sce) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      code: '=',
      options: '='
    },
    replace: true,
    templateUrl: 'app/components/common/directives/youtube/Youtube.html',
    link: function (scope) {
      scope.$watch('code', function (newVal) {
        if (newVal) {
            scope.url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + newVal);
        }
      });
    }
  };
}

app.filter('emptyFilter', [function () {

    var deep_value = function (obj, path) {
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
            obj = obj[path[i]];
        };
        return obj;
    }
    return function (items, path,flag) {
        var filtered = [];
        flag = !flag;
        items && items.forEach(function (element) {
            if ( flag ? deep_value(element, path) : !deep_value(element, path) ) {
                filtered.push(element);
            }
        });
        return filtered;
    }


}]);
function HeaderCtrl($scope,$rootScope,$location,$state,$stateParams) 
{ 
   
}

app.controller('MenuCtrl',['$scope','$rootScope','$location','$state','$stateParams',HeaderCtrl]);




app.service('DateUtil',[function(){
	var DateUtil = function(){
		this.toYYYY_MM_DD = function(date){
			return date.toISOString().split('T')[0];
		};
	};
	return new DateUtil();
}]);
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

app.constant('Endpoints', {
    
});
app.service('StringUtil',[function(){
	var StringUtil = function(){
		this.generateId = function(str){
		   return angular.lowercase(str.split(' ').join('-'));
		}
	};
	return new StringUtil();
}]);
function HomeCtrl($scope, $rootScope, RestAPI, $window, constants, $interval) {
  var me = $scope;
  me.posts = [];
  me.videos = [];
  me.news = [];
  me.isLoading = true;
  me.loaderTotalCount = 3;
  me.loaderCount = 0;

 

  var GET = RestAPI.get(constants.api.url + '/posts');
  GET.success(function(response) {
    me.posts = response ? response : [];
    me.posts.forEach(function(post, index, array) {
      if (constants.postVideoType.indexOf(post.type) != -1) {
        me.videos.push(post);
      } else if (['News'].indexOf(post.type) != -1) {
        me.news.push(post);
      }
    });
    me.showOrHideLoader();
  });
  GET.error(function() {
    me.posts = [];
  });

  var GET = RestAPI.get(constants.api.url + '/upcomingCinemas');
  GET.success(function(response) {
    me.upcomingCinemas = response.data ? response.data : [];
    $rootScope.upcomingCinemas = me.upcomingCinemas;
    me.showOrHideLoader();
  });
  GET.error(function() {
    me.upcomingCinemas = [];
  });

  var GET = RestAPI.get(constants.api.url + '/recentCinemas');
  GET.success(function(response) {
    me.recentCinemas = response.data ? response.data : [];
    me.showOrHideLoader();
  });
  GET.error(function() {
    me.recentCinemas = [];
  });
  me.showOrHideLoader = function() {
    me.loaderCount++;
    if (me.loaderTotalCount == me.loaderCount) {
      me.isLoading = false;
    }
  }
}

app.controller('HomeCtrl', ['$scope', '$rootScope', 'RestAPI', '$window',
    'constants', HomeCtrl]);

function JukeBoxCtrl($scope, $http, $stateParams, constants,RestAPI, $window ) {
	var me = $scope;

	RestAPI.get(constants.endpoints.jukeBox).success(function (response) {
		me.jukeBox  = response;
	}).error(function () {
		me.jukeBox = null;
	});

	$window.scrollTo(0, 0);
}

app.controller('JukeBoxCtrl', ['$scope', '$http', '$stateParams', 'constants', 'RestAPI', '$window', JukeBoxCtrl]);
function PostCtrl($scope, $http, $stateParams, $location,constants,$window,$rootScope) {
	$scope.found = true;
	$scope.isLoading = true;
	if($scope.$parent.posts && $scope.$parent.posts.length>0){
		$scope.$parent.posts.forEach(function (item, index) {
			if(item._id === $stateParams.postName){
				$scope.article = item;
				$scope.isLoading = false;
			}
		});
	}else{
		var GET = $http({
			method : 'GET',
			url : constants.api.url + '/post/' + $stateParams.postName
		});	
		GET.success(function(response) {
			$scope.article = response ? response : null;
			$scope.found = true;
			$scope.isLoading = false;
			$scope.url =  $location.absUrl();
			$rootScope.pageTitle = response.local.ttl;
			$rootScope.pageDesc = response.local.text;
			$rootScope.pageImg = response.type == 'News' ? response.media.img[0]:
			'https://i.ytimg.com/vi/'+response.media.video[0]+'/mqdefault.jpg';
		});
		GET.error(function() {
			$scope.article = null;
			$scope.found = false;
			$scope.isLoading = false;
		});
	}
	$window.scrollTo(0, 0);
}

app.controller('PostCtrl',['$scope','$http', '$stateParams','$location', 'constants','$window','$rootScope',PostCtrl]);
function PrivacyCtrl($scope, $http) {
}

app.controller('PrivacyCtrl', [ '$scope', '$http',PrivacyCtrl ]);


function ShortFilmCtrl($scope, $http, $stateParams, constants,$window) {
	$scope.found = true;
	$scope.isLoading = true;
	if($scope.$parent.posts && $scope.$parent.posts.length>0){
		$scope.$parent.posts.forEach(function (item, index) {
			if(item._id === $stateParams.postName){
				$scope.article = item;
				$scope.isLoading = false;
			}
		});
	}else{
		var GET = $http({
			method : 'GET',
			url : constants.api.url + '/post/' + $stateParams.postName
		});	
		GET.success(function(response) {
			$scope.article = response ? response : null;
			$scope.found = true;
			$scope.isLoading = false;
		});
		GET.error(function() {
			$scope.article = null;
			$scope.found = false;
			$scope.isLoading = false;
		});
	}
	$window.scrollTo(0, 0);
}

app.controller('ShortFilmCtrl',['$scope','$http', '$stateParams', 'constants','$window',ShortFilmCtrl]);
function TermsCtrl($scope, $http) {
}

app.controller('TermsCtrl', [ '$scope', '$http',TermsCtrl ]);

