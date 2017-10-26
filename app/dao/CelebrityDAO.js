function CelebrityDAO(db) {
  "use strict";

  /*
   * If this constructor is called without the "new" operator, "this" points to
   * the global object. Log a warning and call it correctly.
   */
  if (false === (this instanceof CelebrityDAO)) { return new CelebrityDAO(db); }

  var celebrityCollection = db.collection("celebrity");

  this.getCelebrity = function(id, callback) {
    "use strict";

    var query = {
      '_id': id
    };
    celebrityCollection.findOne(query, function(err, celebrityData) {
      "use strict";
      if (err) return callback(err, '{}');
      callback(err, celebrityData);
    });
  }

}

module.exports = CelebrityDAO;
