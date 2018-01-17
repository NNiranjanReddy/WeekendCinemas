var app = angular.module("WcApp", ['ui.router', 'ui.calendar','ezfb']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider,$compileProvider,ezfbProvider) {
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
  // }).state('celebrities', {
  //   url: '/celebrities',
  //   templateUrl: 'app/components/celebrity/CelebrityHome.html',
  //   controller: 'CelebrityHomeCtrl'
   }).state('celebrity', {
    url: '/celebrity/:celebrityId',
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
  });
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $compileProvider.debugInfoEnabled(false);
  ezfbProvider.setInitParams({
    appId: '409415706076752',
    version: 'v2.8'
  });  
});


app.run(['$rootScope', '$state', '$stateParams', 'constants',
  function ($rootScope, $state, $stateParams, constants) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.postVideoType = constants.postVideoType;
    $rootScope.postType = angular.copy($rootScope.postVideoType);
    $rootScope.postType.push('News');
    $rootScope.date = new Date();
    $rootScope.title = "";
    $rootScope.description = "weekendcinema.in | Weekend Cinema is one stop for all telugu cinema review updates, news, trailers, teaser, events, birthdays, short films and many more ...";
    $rootScope.keywords = "weekendcinema.in, Weekend Cinema, telugu review, cinema review, moview review"
  }]);

app.constant('constants', {
  api: {
    url: '/v1'
  },
  endpoints: {
    loadCinema: '/v1/cinema/',
    searchCinema: '/v1/searchCinema/',
    upcomingCinema: '/v1/upcomingCinemas',
    getCinemas: '/v1/cinemas',
    jukeBox: '/v1/jukeBox',
    post: '/v1/post/',
    getCelebrity: '/v1/celebrity/'
  },
  postVideoType: ['Teaser', 'Trailer', 'Stumper', 'Prelude','Promo Song','Video']
});