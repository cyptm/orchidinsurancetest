var bookmarks = require('../controllers/bookmarks.js')();

module.exports = function(app) {

  // GET /bookmarks
  app.get('/bookmarks', function(req, res) {
  	bookmarks.get(req, res);
  });

  // POST bookmarks
  app.post('/bookmarks', function(req, res) {
  	bookmarks.save(req, res);
  });
}
