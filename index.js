//require dependencies
const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const app = express();

//settings
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//middleware
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

//listen to PORT
app.listen(port, () => console.log(`Express is listening on port ${port}`));
