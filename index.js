const express=require('express');
const port=8080;
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const app=express();
const passport=require('passport');
const sassMiddleware=require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());

//Express Layouts Setup
app.use(express.static('./assets'));
app.use(expressLayouts);

// View engine setup 
app.set('view engine','ejs');
app.set('views','./views');

//use express Router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('Cannot run Server !!!',err);
    }
    console.log('Server Running on port - ',port);
});