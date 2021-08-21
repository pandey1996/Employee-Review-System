const express=require('express');
const app=express();
const port=8080;
const cookieParser=require('cookie-parser');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const mongoose=require('mongoose');
const sassMiddleware=require('node-sass-middleware');


//Passport JS variables
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
//Express Layouts Setup
app.use(express.static('./assets'));
app.use(expressLayouts);

// View engine setup 
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'Employee Review System',
    secret: 'qwyteyguqwyt!@#$%^&*(ahsdijhasd%Q^&^*sd54654654',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*50)
    },
    store:new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());


//use express Router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('Cannot run Server !!!',err);
    }
    console.log('Server Running on port - ',port);
});