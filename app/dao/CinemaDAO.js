/* The CinemaDAO must be constructed with a connected database object */
function CinemaDAO(db) {
  "use strict";
  /*
   * If this constructor is called without the "new" operator, "this" points to
   * the global object. Log a warning and call it correctly.
   */
  if (false === (this instanceof CinemaDAO)) {
    console.log('Warning: CinemaDAO constructor called without "new" operator');
    return new CinemaDAO(db);
  }

  var cinemaCollection = db.collection("cinema");

  this.getCinema = function (id, callback) {

    var query = {
      'cinemaId': id
    };
    var projection = {
      "_id": false
    };
    cinemaCollection.findOne(query, projection,function (err, cinemaData) {
      if (err) {
        return callback(err, '{}');
      }
      callback(err, cinemaData);
    });
  };


  this.searchCinema = function (text, callback) {

    var query = { $text: { $search: text } }

    var projection = {
      "cinemaId": true,
      "name": true,
      "general.releaseDt": true,
      "lang": true,
      "type": "cinema",
      "_id": false
    }

    cinemaCollection.find(query, projection).toArray(function (err, data) {
      if (err) {
        return callback(null, '{}');
      } else {
        callback(err, data);
      }
    });

  };

  this.upcomingCinemas = function (callback) {

    var query = {
      "$or": [{
        "general.releaseDt": {
          "$gte": new Date()
        }
      }, {
        "general.releaseDt": {
          "$eq": ""
        }
      }]
    };
    var projection = {
      "cinemaId": true,
      "name": true,
      "general.releaseDt": true,
      "general.posterUrl": true,
      "lang": true,
      "_id": false
    }
    var sort = {
      'general.releaseDt': 1
    }
    cinemaCollection.find(query, projection).sort(sort).toArray(function (err, data) {
      if (err) {
        return callback(null, '{}');
      } else {
        callback(err, data);
      }
    });
  };
  this.recentCinemas = function (callback) {
    var query = {
      "general.releaseDt": {
        "$lte": new Date()
      }
    };
    var projection = {
      "cinemaId": true,
      "name": true,
      "general.releaseDt": true,
      "general.posterUrl": true,
      "general.rating": true,
      "lang": true,
      "_id": false
    }
    var sort = {
      'general.releaseDt': -1
    }
    cinemaCollection.find(query, projection).sort(sort).toArray(function (err, data) {
      if (err) {
        return callback(null, '{}');
      } else {
        callback(err, data);
      }
    });
  };

  this.jukeBox = function (callback) {
    var query = {
      "songs.releaseDt": {
        "$lte": new Date()
      }
    };
    var projection = {
      "cinemaId": true,
      "name": true,
      "songs.youtubeUrl": true,
      "songs.releaseDt": true,
      "lang": true,
      "_id": false
    }
    var sort = {
      'songs.releaseDt': -1
    }
    cinemaCollection.find(query, projection).sort(sort).toArray(function (err, data) {
      if (err) {
        return callback(null, '{}');
      } else {
        callback(err, data);
      }
    });
  };

}

module.exports = CinemaDAO;
