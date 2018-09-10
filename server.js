const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const apiRoutes = require('./routes/api-routes');
const PORT = process.env.PORT || 3000;

const app = express();

// Serve static content from the public directory
app.use(express.static('public'));

// Setup body-parser
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());

// Setup handlebars
app.engine('.hbs', exphbs({defaultLayout: '../../public/index', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Setup routes
app.use(apiRoutes);

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) });