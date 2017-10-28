var router     = require("express").Router();
var passport   = require("passport");
var middleware = require("../middleware/middleware.js");


/* Passport authentication middleware */
// Using a successRedirect property,
// 		prevents other middleware layers from behaving properly.
var loginMiddleware = passport.authenticate("login", {
	failureRedirect:"/",
	// successRedirect: "/user/",
	failureFlash: true
});

var registerMiddleware = passport.authenticate("register", {
	failureRedirect:"/",
	// successRedirect: "/user/",
	failureFlash: true
});

router.get("/", function(req, res){
	var loginMessage    = req.flash("loginMessage");
	var registerMessage = req.flash("registerMessage");

	// Login and register failure messages.
	if(loginMessage.length){
		console.log(`login error: ${loginMessage}`);
	}
	if(registerMessage.length){
		console.log(`register error: ${registerMessage}`);
	}
	res.render("index");
});

router.post("/login", loginMiddleware, middleware.storeToken, function(req, res){
	createUserSession(req); // Saves a user object in the session.
	res.redirect("/user/");
});

router.post("/register", registerMiddleware, middleware.storeToken, function(req, res){
	createUserSession(req); // Saves a user object in the session
	res.redirect("/user/");
});

function createUserSession(req){
	req.session.user          = {};
	req.session.user.id       = req.user.id;
	req.session.user.username = req.user.username;
	req.session.user.email    = req.user.email;
}

router.get("/home", function(req, res){

	if(req.isAuthenticated()){
		res.redirect("/user/home");		
	}else{
		res.redirect("/");
	}
});



module.exports = router;