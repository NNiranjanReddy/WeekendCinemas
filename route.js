var CinemaController = require(__dirname + '/app/controller/CinemaController');
var PostController = require(__dirname + '/app/controller/PostController');
var CelebrityController = require(__dirname + '/app/controller/CelebrityController');

module.exports = function (app, db, express, path) {

  var cinemaController = new CinemaController(db);
  var postController = new PostController(db);
  var celebrityController = new CelebrityController(db);

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  app.get("/v1/upcomingCinemas", cinemaController.upcomingCinemas);
  app.get("/v1/searchCinema/:text", cinemaController.searchCinema);
  app.get("/v1/recentCinemas", cinemaController.recentCinemas);
  app.get("/v1/jukeBox", cinemaController.jukeBox);
  app.get("/v1/cinema/:id", cinemaController.getCinema);
  app.get("/v1/celebrity/:id", celebrityController.getCelebrity);
  app.get("/v1/posts/", postController.getPosts);
  app.get("/v1/post/:id", postController.getPost);
  app.post("/v1/post/:id", postController.savePost);

  app.get("*", function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
  });
}
