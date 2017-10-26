var CelebrityDAO = require('../dao/CelebrityDAO');

function CelebrityController(db) {
  "use strict";
  var celebrityDAO = new CelebrityDAO(db);

  this.getCelebrity = function(req, res, next) {
    var id = req.params.id;
    celebrityDAO.getCelebrity(id, function(err, details) {
      if (err) throw next(err);
      res.json(details);
    });
  }
}

module.exports = CelebrityController;