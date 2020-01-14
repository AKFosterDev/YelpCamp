// All the middleware goes here
var Campground 	  = require("../models/campground");
var Comment		  = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "CAMPGROUND NOT FOUND");
				res.redirect("back");
			} else {
				// does user own the campground
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "YOU DON'T HAVE PERMISSION TO DO THAT!");
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = function (req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			} else {
				// does user own the comment
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "YOU DO NOT HAVE PERMISSION TO DO THAT.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "YOU NEED TO BE LOGGED IN TO DO THAT.");
		res.redirect("back");
	}
};


middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "YOU NEED TO BE LOGGED IN TO DO THAT!");
	res.redirect("/login");
};





module.exports = middlewareObj;

