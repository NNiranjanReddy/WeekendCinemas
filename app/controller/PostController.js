var PostDAO = require('../dao/PostDAO');

function PostController(db) {
  "use strict";
  var postDAO = new PostDAO(db);

  this.getPosts = function(req, res, next) {
    postDAO.getPosts(function(err, data) {
      if (err) throw next(err);
      res.json(data);
    });
  }

  this.getPost = function(req, res, next) {
    postDAO.getPost(req.params.id, function(err, data) {
      if (err) throw next(err);
      res.json(data);
    });
  }
  this.savePost = function(req, res, next) {
    postDAO.savePost(req.body ,function(err, data) {
      var responseData  = {};
      if (err) {
        responseData.status = 'duplicate'
      }else{
        responseData.status = 'Success';
      }
      res.json(responseData);
    });
  }
}

module.exports = PostController;
