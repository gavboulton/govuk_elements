var bodyParser = require('body-parser'),
    config = require(__dirname + '/app/config.js'),
    express = require('express'),
    nunjucks = require('express-nunjucks'),
    path = require('path'),
    routes = require(__dirname + '/app/routes.js'),
    app = express(),
    port = (process.env.PORT || 3000);

// Application settings
app.set('view engine', 'html');
app.set('views', [__dirname + '/app/views', __dirname + '/lib/']);

nunjucks.setup({
  autoescape: true,
  watch: true,
  noCache: true
}, app);

// Middleware to serve static assets
app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/govuk_modules/public'));
app.use('/public', express.static(__dirname + '/govuk_modules/govuk_template/assets'));
app.use('/public', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit'));

// Support for parsing data in POSTs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// send assetPath to all views
app.use(function (req, res, next) {
  res.locals.asset_path="/public/";
  next();
});

// Add variables that are available in all views
app.use(function (req, res, next) {
  res.locals.cookieText=config.cookieText;
  next();
});

// routes (found in routes.js)

routes.bind(app, '/public/');

// start the app

app.listen(port);
console.log('');
console.log('Listening on port ' + port);
console.log('');
