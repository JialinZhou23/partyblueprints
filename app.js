const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const ideaListsController = require('./controllers/ideaListsController');


const app = express();

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');
const ideaList = require('./routes/ideaList');

// Passport Config
require('./config/passport')(passport);

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
  useMongoClient: true
})
//connect mongoose, demo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});


// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Index Route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/ideaList', (req, res) => {
  res.render('ideaList');
});

app.post('/ideaList', (req, res) => {
  console.log("The party type is "+req.body.partyType)
  res.render('ideaList');
});

app.get('/ideaLists', ideaListsController.getAllIdeaLists );
app.post('/saveIdeaList', ideaListsController.saveIdeaList );
app.post('/deleteIdeaList', ideaListsController.deleteIdeaList );



// Use routes
app.use('/ideas', ideas);
app.use('/users', users);
app.use('/ideaList', ideaList);

const port = 3000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});