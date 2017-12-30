function CinemaCtrl($scope, $http, $stateParams,$location, RestAPI, constants,StringUtil) {
	var me = $scope;
	me.cinemaName = $stateParams.cinemaName;
	me.isLoading = true;
	me.currentSong = "";
	me.found = true;
	me.fbLikes =$location.absUrl();
	me.setCurrentSong = function (val) {
		me.currentSong = val+'?autoplay=1';
	};
	me.getName = function(id){
		return StringUtil.generateName(id);
	};
	RestAPI.get(constants.endpoints.loadCinema + me.cinemaName).success(function (response) {
		me.cinema = response || null;
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
		$('.tooltipped').tooltip();
		me.isLoading = false;
	}).error(function () {
		me.cinema = null;
		me.isLoading = false;
	});

}
app.controller('CinemaCtrl', ['$scope', '$http', '$stateParams','$location', 'RestAPI', 'constants','StringUtil', CinemaCtrl]);

