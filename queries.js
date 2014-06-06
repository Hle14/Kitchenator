var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function callback(){
	//export the schema and operations if connection is successful
});

var recipeSchema = new Schema({
	id: Number,
	title: String,
	author: String,
	//rating: Number,
	//added: Date,
	ingredients: [String] //will later use a nested array of json objects {sub-ingredient name, [String array of ingredients]}
	instructions: String,
	{colllection: 'recipes'}
});

/** QUESTION: can a predefined schema be used as a value-type in another schema? **/

//Schema#add method allows adding of additional keys to a schema

var recipe = mongoose.model('recipe',recipeSchema);

//takes a string containing all ingredients and puts them into a json object
/* ingredients will be entered in a separate textbox, formatted as follows...

	ingredient1:amount,cherries:1cup,tomatoes:5x,mountain dew:16 fl oz

	delimited using ':' and ','
	*/
var parse_ingredients = function(ingredients_list)
{
	//create a new json object to hold the ingredients
	var ingredients = [{ingredient:String,amount:String}];

	//separate ingredients
	var ingredients_array = ingredients_list.split(",");

	var ingredient_;
	foreach(ingredient in ingredients_array)
	{
		ingredient_ = ingredient.split(":");
		ingredients.push({ ingredient: ingredient_[0],amount: ingredient_[1]});
	}

	return ingredients;
};

/*
implementing CRUD operations
*/

var create = function(_title,_author,_ingredients,_instructions)
{
	//no search needed here, unless we want to group alternative recipes for a dish together

	//create a unique recipe id

	var ingredients_array = parse_ingredients(_ingredients);
	//construct a recipe instance
	var new_recipe = new recipe({
		title: _title,
		author: _author,
		ingredients: ingredients_array,
		instructions: _instructions
	});
	//add/save it to the database
	new_recipe.save(function(err){
		if (err) return handleError(err);
	});
};

var read = function();

var update = function();

var delete = function();