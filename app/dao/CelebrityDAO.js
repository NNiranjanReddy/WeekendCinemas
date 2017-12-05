function CelebrityDAO(db) {
  "use strict";

  /*
   * If this constructor is called without the "new" operator, "this" points to
   * the global object. Log a warning and call it correctly.
   */
  if (false === (this instanceof CelebrityDAO)) { return new CelebrityDAO(db); }

  var celebrityCollection = db.collection("cinema");

  this.getCelebrity = function (id, callback) {
    "use strict";

    var query = {
      "people":
      {
        $elemMatch: {
          "celebrityId": id
        }

      }
    };

    var projection = {
      "cinemaId": true,
      "name": true,
      "general.releaseDt": true,
      "lang": true,
      "type": "cinema",
      "_id": false,
      "people":true
    }

    var sort = {
      'general.releaseDt': -1
    }
    celebrityCollection.find(query, projection).sort(sort).toArray(function (err, data) {
      if (err) {
        return callback(null, '{}');
      } else {
        callback(err, data);
      }
    });
  }

}

module.exports = CelebrityDAO;
