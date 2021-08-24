const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Employee=require('../models/employees');

// User Authentication using Passport
passport.use(new LocalStrategy({
        usernameField: 'username',
    },
    function(username, password, done){
        Employee.findOne({
            email: username,
        },function(err,user){
            if(err){ console.error.bind("Error",err); return done(err);}
            if(!user){
                console.log('Wrong Username');
                return done(null,false,{ message: "User Not Found!!"});
            }
            if(user.password!=password){
                console.log('Wrong Password');
                return done(null,false, {message: "Password not Valid"});
            }
            console.log('Everything OK');
            return done(null,user);
        });
        
    }
));

//Serializing the user to store data into cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});
//Deserializing the user removing cookie from the store
passport.deserializeUser(function(id,done){
    Employee.findById(id, function(err,user){
        if(err){ 
            console.log('Error in finding the user');
            return done(err);
        }   
        return done(null,user);
    })
});

//Middleware to check Already Authenticated user
passport.checkAuthentication=function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash('error','Please Sign in to Access');
        return res.redirect('/employees/signin');
    }
}

//Middleware to set new Authenticated user
passport.setAuthenticatedEmployee=function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
        console.log(res.locals);
    }
    next();
}

module.exports=passport;

