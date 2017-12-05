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
		me.releaseDt = angular.isDate(me.cinema.general.releaseDt) ? me.cinema.general.releaseDt : null;
		me.releaseYear = me.releaseDt ? null : me.cinema.general.releaseDt;
		me.poster = me.cinema.general.posterUrl ? me.cinema.general.posterUrl : me.cinema.general.coverPic;
		if (me.cinema.songs) {
			if (me.cinema.songs.youtubeUrl) {
				me.currentSong = me.cinema.songs.youtubeUrl;
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
		$('.tabs').tabs();
		me.isLoading = false;
	}).error(function () {
		me.cinema = null;
		me.isLoading = false;
	});

}
app.controller('CinemaCtrl', ['$scope', '$http', '$stateParams', 'RestAPI', 'constants', CinemaCtrl]);

