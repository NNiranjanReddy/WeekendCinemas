function PostDAO(db) {
  "use strict";

  if (false === (this instanceof PostDAO)) { return new PostDAO(db); }

  var postCollection = db.collection("posts");

  this.getPosts = function (callback) {
    postCollection.find().sort({
      'lstmntDt': -1
    }).toArray(function (err, data) {
      if (err) return callback(null, '{}');
      callback(err, data);
    });
  };

  this.getPost = function (id, callback) {
    var query = {
      '_id': id
    };
    postCollection.findOne(query, function (err, data) {
      if (err) return callback(null, '{}');
      callback(err, data);
    });
  };

  this.savePost = function (body, callback) {
    body.lstMntDT = new Date();
    postCollection.insert(body, function (err, data) {
      callback(err, data);
    });
  };
}

module.exports = PostDAO;
