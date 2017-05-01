//Send Email from Node
//https://codeforgeek.com/2014/07/send-e-mail-node-js/

// server.js
// modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

// configuration

// set ports
var port = process.env.PORT || 1738;

// connect to mongoDB database
// mongoose.connect(db.url);
// Beautify routes
/*app.get('/artists', function(req, res) { res.redirect('/#/artists'); });
app.get('/artists/details/:artistId', function(req, res) { res.redirect('/#/artists/details/'+req.params.artistId); });
app.get('/empire', function(req, res) { res.redirect('/#/empire'); });
app.get('/empire/media', function(req, res) { res.redirect('/#/empire/media'); });
app.get('/media', function(req, res) { res.redirect('/#/media'); });
app.get('/news', function(req, res) { res.redirect('/#/news'); });
app.get('/news/article/:newsid', function(req, res) { res.redirect('/#/news/article/'+req.params.newsid); });
app.get('/events', function(req, res) { res.redirect('/#/events'); });
app.get('/releases', function(req, res) { res.redirect('/#/releases'); });
app.get('/contactus', function(req, res) { res.redirect('/#/contactus'); });
app.get('/underconstruction', function(req, res) { res.redirect('/#/underconstruction'); });
*/


// get all data of the body (POST) params
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json'}) );

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes
app.get('*', function(req, res) {
    res.sendFile('index.html',  { root: path.join(__dirname, './public') });
});

// start app
app.listen(port);
// User message
console.log('Application is open on port ' + port);
