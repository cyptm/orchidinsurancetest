var auth = require('basic-auth');

module.exports = function() {

	var bookmarks = bookmarks || [];
	var response = {};

	return {
		get : function(req, res) {
			res.json(bookmarks);
		},
		save : function(req, res) {
			var creds = auth(req);
			if (!creds || creds.name !== 'orchid' && creds.pass !== 'insurance') {
				res.statusCode = 403;
				res.setHeader('WWW-Authenticate', 'Basic realm="Orchid Insurance"')
				res.send('Access denied');
			} else {
				bookmarks.push(req.body);
				// console.log(bookmarks);
				res.json("Bookmark successfully saved");
			}
		}
	}
}

