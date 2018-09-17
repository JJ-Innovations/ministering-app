var Nerd = require('./models/nerd');
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

module.exports = function(app) {
    
    app.get('/app/nerds', function(req, res) {
        Nerd.find(function(err, nerds) {
            if (err) {
                res.send(err);
            }
            res.json(nerds);
        });
    });

    app.post('/api/register', function(req, res) {
        var user = new User();
        
        user.username = req.body.username;
      
        user.setPassword(req.body.password);
      
        user.save(function(err) {
          var token;

          token = user.generateJwt();
          
          err ? res.status(500) : res.status(200);

          res.json({
            "token" : token,
            "status": err
          });
        });
    });

    app.post('/api/login', function(req, res) {
        passport.authenticate('local', function(err, user, info){
        var token;
    
        // If Passport throws/catches an error
        if (err) {
          res.status(404).json(err);
          return;
        }
    
        // If a user is found
        if(user){
          token = user.generateJwt();
          res.status(200);
          res.json({
            "token" : token
          });
        } else {
          // If user is not found
          res.status(401).json(info);
        }
      })(req, res)
    });

    app.get('/api/profile', auth, function(req, res) {

        // If no user ID exists in the JWT return a 401
        if (!req.payload._id) {
          res.status(401).json({
            "message" : "UnauthorizedError: private profile"
          });
        } else {
          // Otherwise continue
          User
            .findById(req.payload._id)
            .exec(function(err, user) {
              res.status(200).json(user);
            });
        }
      
      });

    
    // app.get('*', function(req, res) {
    //     res.sendfile('./dist/index.html');
    // });

    
};