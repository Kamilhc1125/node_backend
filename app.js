const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const app = express();

const pageRoute = require('./routes/page');
const todoRoute = require('./routes/todo');

dotenv.config();

const port = process.env.PORT || 4000;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoUrl = `mongodb+srv://Kamil_1125:${mongoPassword}@testcluster.w6evlo7.mongodb.net/?retryWrites=true&w=majority`;

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
// MIDDLEWARE => MONGO DB CONNECTION
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log('Mongo DB Connected'))
.catch((error) => console.log(error));

// MIDDLEWARE => SET TEMPLATING ENGINE AS EJS
app.set('view engine', 'ejs');

// MIDDLEWARE => BODY PARSER
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// MIDDLEWARE => METHOD OVERRIDE
app.use(methodOverride('_method'));

// MIDDLEWARE => STATIC FILES (CSS)
app.use(express.static('public'));

// MIDDLEWARE => CORS
app.use(cors(corsOptions));

// MIDDLEWARE => ROUTER
app.use('/', pageRoute);
app.use('/todo', todoRoute);

app.listen(port, () => console.log(`Server started on port ${port}`));