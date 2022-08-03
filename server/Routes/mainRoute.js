const router = require("express").Router()
const mainController = require("../controllers/mainController.js")
router.get("/" , mainController.homePage);
router.get("/categories" , mainController.categories);
router.get("/categories/:id" , mainController.category);
router.get("/recipes" , mainController.recipes);
router.get("/recipes/:id" , mainController.recipeDetail);
router.post("/search" , mainController.search);
router.get("/explore-latest" , mainController.exploreLatest);
router.get("/explore-random" , mainController.randomRecipe);
router.get("/submitForm" , mainController.submitRecipe);
router.post("/submitForm" , mainController.submitRecipePost);
module.exports = router;
