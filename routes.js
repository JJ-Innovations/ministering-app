var Nerd = require('./models/nerd');
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

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
          res.status(200);
          res.json({
            "token" : token
          });
        });
    });
    
    app.get('*', function(req, res) {
        res.sendfile('./dist/index.html');
    });

    
};