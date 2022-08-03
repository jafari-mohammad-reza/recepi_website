/**
 * GET /
 * HOMEPAGE
 */
const {RecipeModel} = require("../models/Recipe.js")
const {CategoryModel} = require("../models/Category");
const {isValidObjectId} = require("mongoose");
exports.homePage = async (req, res) => {
    try {
        const categories = await CategoryModel.find({}).limit(5);
        const latestRecipes = await RecipeModel.find({is_approved: true}).sort({_id: -1}).limit(5)
        res.render("index", {title: 'Homepage', categories, latestRecipes});
    } catch (e) {
        res.status(500).send(e.message);
    }
}


exports.categories = async (req, res) => {
    try {
        const categories = await CategoryModel.find({});
        res.render("categories", {title: 'Categories', categories});
    } catch (e) {
        return res.status(500).send(e.message)
    }
}


exports.category = async (req, res) => {
    try {
        const {id} = req.params
        if (!id || !isValidObjectId(id)) {
            return res.status(404).send("Invalid id")
        }
        const category = await CategoryModel.findById(id)
        const recipes = await RecipeModel.find({category: id , is_approved: true})
        return res.render("categories", {title: `${category.name} Recipes`, categories: recipes})
    } catch (e) {
        return res.status(500).send(e.message)
    }
}
exports.recipes = async (req, res) => {
    try {
        const recipes = await RecipeModel.find({is_approved: true})
        res.render("recipes", {title: 'Recipes', recipes});
    } catch (e) {
        return res.status(500).send(e.message)
    }
}
exports.recipeDetail = async (req, res) => {
    try {
        const {id} = req.params
        if (!id || !isValidObjectId(id)) {
            return res.status(404).send("Invalid id")
        }
        const recipe = await RecipeModel.findById(id).populate({path: "category"})
        res.render("recipeDetail", {title: `${recipe.name}`, recipe});
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

exports.search = async (req, res) => {
    try {
        const {searchTerm} = req.body
        const recipes = await RecipeModel.find({$text: {$search: searchTerm, $diacriticSensitive: true} , is_approved: true})
        res.render("recipes", {title: `Search for ${searchTerm}`, recipes});
    } catch (e) {
        return res.status(500).send(e.message)
    }
}


exports.exploreLatest = async (req, res) => {
    try {
        const recipes = await RecipeModel.find({is_approved: true}).sort({_id: -1}).limit(5)
        res.render("recipes", {title: 'Explore Latest', recipes});
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

exports.randomRecipe = async (req, res) => {
    try {
        const count = await RecipeModel.find({is_approved: true}).countDocuments()
        const random = Math.floor(Math.random() * count)
        const recipe = await RecipeModel.findOne({is_approved: true}).skip(random).exec()
        res.render("recipeDetail", {title: recipe.name, recipe});
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

exports.submitRecipe = async (req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    const categories = await CategoryModel.find({});
    res.render('submitForm', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  , categories} );
}
exports.submitRecipePost = async (req, res) => {
    try {
        const {name, description, image, category, ingredients} = req.body
        if (!req.files || Object.keys(req.files).length === 0) {
            req.flash('infoErrors', 'Please upload an image')
            return res.redirect('/submitForm')
        }
        const imageUploadFile = req.files.image;
        const newImageName = Date.now() + imageUploadFile.name;

        const uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

        await imageUploadFile.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);
        })
        await RecipeModel.create({name, description,image : newImageName, category, ingredients})
            .then(() => {
                req.flash('infoSubmit', 'Recipe submitted successfully')
                res.redirect("/submitForm")
            })
            .catch(
                (error) => {
                    req.flash('infoErrors', error.message);
                    return res.redirect("/submitForm")
                }
            )

    } catch (error) {
        req.flash('infoErrors', error.message);
        return res.redirect("/submitForm")
    }
}