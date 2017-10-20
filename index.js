//require dependencies
const express = require('express');
const morgan = require('morgan');
const routes = require('./config/routes');
const port = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');


const app = express();

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
