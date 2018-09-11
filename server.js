const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const apiRoutes = require('./routes/api-routes');
const htmlRoutes = require('./routes/html-routes');
const db = require('./models');
const PORT = process.env.PORT || 3000;
var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "0bcc8225757ff024f45d0b16c6718031",
      secret: "e709b11b283d4dcc"
    };

Flickr.authenticate(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
});

const app = express();

// Serve static content from the public directory
app.use(express.static('/public'));

// Setup body-parser
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());

// Setup handlebars
app.engine('.hbs', exphbs({defaultLayout: '../../public/index', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Setup routes
app.use(apiRoutes);
app.use(htmlRoutes);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) });
});

