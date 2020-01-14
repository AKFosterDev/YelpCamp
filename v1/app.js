var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// var request = require("request");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
		{name: "Salmon Creek", 	
		 image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e72267cdd9f4ec0_340.jpg"},
		{name: "Granite Ridge", 
		 image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722872d39e45c65d_340.jpg"},
		{name: "Goat Crossing", 
		 image:"https://pixabay.com/get/55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c722872d39e45c65d_340.jpg"},
	{name: "Salmon Creek", 	
		 image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e72267cdd9f4ec0_340.jpg"},
		{name: "Granite Ridge", 
		 image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722872d39e45c65d_340.jpg"},
		{name: "Goat Crossing", 
		 image:"https://pixabay.com/get/55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c722872d39e45c65d_340.jpg"},
	{name: "Salmon Creek", 	
		 image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e72267cdd9f4ec0_340.jpg"},
		{name: "Granite Ridge", 
		 image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722872d39e45c65d_340.jpg"},
		{name: "Goat Crossing", 
		 image:"https://pixabay.com/get/55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c722872d39e45c65d_340.jpg"}
	]

// =======================================================
// ROUTES	
// =======================================================

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
// 	get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
// 	redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});


// =======================================================
// SERVER	
// =======================================================
	
app.listen(3000, function(){
	console.log("The YelpCamp server listening on port 3000");
});
