//require dependencies
const express = require('express');
const morgan = require('morgan');
const routes = require('./config/routes');
const { port, dbURI } = require('./config/environment');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();
mongoose.connect(dbURI, { useMongoClient: true });

//settings
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//middleware
app.use(expressLayouts);
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

app.use(routes);
//listen to PORT
app.listen(port, () => console.log(`Express is listening on port ${port}`));
