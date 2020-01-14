var LocalStrategy 	= require("passport-local"),
	methodOverride	= require("method-override"),
	passport 	  	= require("passport"),
	bodyParser 	  	= require("body-parser"),
	Campground 	  	= require("./models/campground"),	 
	express 	  	= require("express"),
	mongoose 	  	= require("mongoose"),
	flash			= require("connect-flash"),
	Comment		  	= require("./models/comment"),
	User		  	= require("./models/user"),
	app 		  	= express(),
	seedDB		  	= require("./seeds");

// Requiring Routes
var campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes 	 = require("./routes/comments"),
	indexRoutes 		 = require("./routes/index");
	

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp_v10", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database


// PASSPORT CONFIGURATION	
app.use(require("express-session")({
	secret: "Bandit is the best cat",
	resave: false,
	saveUninitialize: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(3000, function(){
	console.log("The YelpCamp server listening on port 3000");
});
