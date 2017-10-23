var passport = require('passport');
var mongoose = require('mongoose');
var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function() {
    var Usuario = mongoose.model('Usuario');

	passport.use(new GitHubStrategy({
		clientID: 'b76cec282b4208b9bc19',
		clientSecret: 'ff105b9cf6a7381a6ca738c685c5c3142ddacaf6',
		callbackURL: 'https://market-mean.herokuapp.com/auth/github/callback'
	}, 
	function(accessToken, refreshToken, profile, done) {
		
		Usuario.findOrCreate(
			{ "username" : profile.id}, 
			{ "name" : profile.username},  
			function(erro, usuario) {
				if(erro) {
					return done(erro);
				} 
				return done(null, usuario);
			}
		);
	}));

	passport.use(new FacebookStrategy({
		clientID: '357687218034556',
		clientSecret: '46de01b69855fe1f165ee4cbdcb98c40',
		callbackURL: 'https://market-mean.herokuapp.com/auth/facebook/callback'
	}, function(accessToken, refreshToken, profile, done) {
		
		Usuario.findOrCreate(
			{ "username" : profile.id}, 
			{ "name" : profile.displayName},  
			function(erro, usuario) {
				if(erro) {
					return done(erro);
				} 
				return done(null, usuario);
			}
		);
	}));

	passport.use(new GoogleStrategy({
		clientID: '522928124247-i7ltm4qauuegm03kham4u83jnnes1dgd.apps.googleusercontent.com',
		clientSecret: 'DLPeSPWDfPxSawMx_zOC3cc4',
		callbackURL: 'https://market-mean.herokuapp.com/auth/google/callback',
		accessType: 'offline'
	  },
	  function(token, refreshToken, profile, done) {

		Usuario.findOrCreate(
			{ "username" : profile.id}, 
			{ "name" : profile.displayName},  
			function(erro, usuario) {
				if(erro) {
					return done(erro);
				} 
				return done(null, usuario);
			})
		}
	));	

	passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });
  
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
            .then(function(usuario) {
                done(null, usuario);	
            });
        }
    );    
    
}