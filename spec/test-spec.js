var sinon = require('sinon');

var bookmarks = require('../server/controllers/bookmarks.js')();


describe('save()', function() {
	it("saves a bookmark when valid credentials auth are provided", function () {
		var auth = new Buffer('orchid:insurance').toString('base64');
		
		// stub request
		var req = {
			headers: {
				authorization: 'Basic ' + auth
			}
		};
		
		// stub response
		var res = {
			json: function(payload) {}
		};
		
		// Spy on res.json method and expect the correct response is sent
		var json = sinon.spy(res, 'json');
		var expectedJson = 'Bookmark successfully saved';
		bookmarks.save(req, res);
		
		json.restore();
	    sinon.assert.calledWith(json, expectedJson);
	});
});

describe('save()', function() {
	it("Denies access and sets correct header when invalid auth credentials are provided", function () {
		var auth = new Buffer('bad:cred').toString('base64');
		
		// stub request
		var req = {
			headers: {
				authorization: 'Basic ' + auth
			}
		};
		
		// stub response
		var res = {
			setHeader: function(header) {},
			send: function(payload) {}
		};

		// Spy on res.setHeader method and expect the correct headers are set
		var setHeader = sinon.spy(res, 'setHeader');
		bookmarks.save(req, res);
		setHeader.restore();
	    sinon.assert.calledWith(setHeader, sinon.match('WWW-Authenticate'), sinon.match('Basic realm="Orchid Insurance"'));
    
        // Spy on res.send method and expect the correct payload
        // This should probably be put into a separate unit test, but you get the point
		var send = sinon.spy(res, 'send');
		bookmarks.save(req, res);
		send.restore();
	    sinon.assert.calledWith(send, 'Access denied');
	});
});