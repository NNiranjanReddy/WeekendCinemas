function CinemaCtrl($scope, $rootScope,$http, $stateParams,$location, RestAPI, constants,StringUtil) {
	var me = $scope;
	me.cinemaName = $stateParams.cinemaName;
	me.cast  = [];
	me.isLoading = true;
	me.currentSong = "";
	me.found = true;
	me.cinemaUrl =$location.absUrl();
	me.jsonLd = {};

	me.pluginOn = true;
	me.rendering = false;
	me.rendered = function () {
	  me.rendering = false;
	};
	me.$watch('pluginOn', function (newVal, oldVal) { 
	  if (newVal !== oldVal) {
		me.rendering = true;
	  }
	});
	me.$on('$routeChangeSuccess', function () {
	  me.rendering = true;
	});
	me.setCurrentSong = function (val) {
		me.currentSong = val+'?autoplay=1';
	};
	me.getName = function(id){
		return id ? StringUtil.generateName(id) : id ;
	};
	RestAPI.get(constants.endpoints.loadCinema + me.cinemaName).success(function (response) {
		me.cinema = response || null;
		$rootScope.title =   me.cinema.name + ' Telugu Movie Review | '+ me.cinema.name + ' Review and Rating | '  + me.cinema.name + ' telugu Review and Rating | ' + me.cinema.name + ' Telugu Cinema Review | '  + me.cinema.name + ' Film Review | '  + me.cinema.name + ' Movie Review in Telugu | '  + me.cinema.name + ' Film Review | '  + me.cinema.name + ' Telugu Review | '  + me.cinema.name + ' Film Review | '  + me.cinema.name + ' Movie Review in Telugu | '  + me.cinema.name + ' Film Review | '  + me.cinema.name + ' Telugu Review | '  + me.cinema.name + ' Review | '  + me.cinema.name + ' Cinema Review | '  + me.cinema.name + ' Review | '  + me.cinema.name + ' Movie Review | '+me.cinema.name+ ' Teaser | '+ me.cinema.name+' Trailer';
		$rootScope.description = me.cinema.name + ' Telugu Movie Review , '+ me.cinema.name + ' Review and Rating , '  + me.cinema.name + ' telugu Review and Rating , ' + me.cinema.name + ' Telugu Cinema Review , '  + me.cinema.name + ' Film Review , '  + me.cinema.name + ' Movie Review in Telugu , '  + me.cinema.name + ' Film Review , '  + me.cinema.name + ' Telugu Review , '  + me.cinema.name + ' Film Review , '  + me.cinema.name + ' Movie Review in Telugu , '  + me.cinema.name + ' Film Review , '  + me.cinema.name + ' Telugu Review , '  + me.cinema.name + ' Review , '  + me.cinema.name + ' Cinema Review , '  + me.cinema.name + ' Review , '  + me.cinema.name + ' Movie Review , '+me.cinema.name+ ' Teaser , '+ me.cinema.name+' Trailer';
		$rootScope.keywords = $rootScope.description;
		me.banners = [];
		if(me.cinema.general.banner){
			me.cinema.general.banner.forEach(function(element) {
				me.banners.push(me.getName(element.bannerId));
			});
		}
		if (me.cinema.songs) {
			if (me.cinema.songs.youtubeUrl) {
				me.currentSong = me.cinema.songs.youtubeUrl || "";
			} else if (me.cinema.songs.list.length) {
				me.currentSong = me.cinema.songs.list[0].youtubeUrl;
			}
		}
		me.currentVideo = me.cinema.videos ? me.cinema.videos.find(function (video) {
			video.type === 'Trailer';
		}) : null;

		me.director =  me.cinema.people.find(function (cel) {
			return cel.type === 'Director';
		});

		me.producer = me.cinema.people.find(function (cel) {
			return cel.type === 'Producer';
		});

		me.cinema.people.forEach(function(cel){
			 if(cel.type == 'Actor'){
				 me.cast.push(cel);
			 }
		});

		me.people = me.cinema.people.cast ? me.cinema.people.cast.concat(me.cinema.people.crew) : me.cinema.people;
		me.jsonLd = {
			"@context": "http://schema.org",
			"@type": "Movie",
			"dateCreated":me.cinema.general.releaseDt,
			"name": me.cinema.name,
			"url":me.cinemaUrl,
			"image":"https://res.cloudinary.com/weekendcinema/image/upload/v1515773285/cinema/"+me.cinema.cinemaId+"-cover.jpg",
			"description": "",
			"review":{
					"@type": "Review",
					"description": "",
					"author":"weekendcinema.in",
					"reviewRating": {
						"@type": "Rating",
						"ratingValue":me.cinema.general.rating
					}
			},
			"director": {
			"@type": "Person",
			"name": me.getName(me.director ? me.director.celebrityId:"")
			},
			"actor": [
			 ]
		};
		me.cast.forEach(function(cel){
			var person  = {
				"@type": "Person",
				"name": ""
			};
			person.name = me.getName(cel.celebrityId);
			me.jsonLd.actor.push(person);
		});
		me.isLoading = false;
	}).error(function () {
		me.cinema = null;
		me.isLoading = false;
	});
}
app.controller('CinemaCtrl', ['$scope','$rootScope', '$http', '$stateParams','$location', 'RestAPI', 'constants','StringUtil', CinemaCtrl]);

