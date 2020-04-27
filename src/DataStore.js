const Store = require('electron-store');

const recipeSchema = {
  title: {
    type: 'string',
    minLength: 1,
    maxLength: 30
  },
  id: {
    type: 'integer',
    default: -1
  },
  categories: {
    type: 'array',
    items: {
      type: 'string'
    }
  }
}

class RecipeStore extends Store {

  constructor() {
    super({name: "recipes", schema: recipeSchema});
    this.recipes = this.get('recipes') || [];
    this.id = 0;
  }

  saveRecipes() {
    this.set('recipes', this.recipes);
    return this;
  }

  getRecipes() {
    this.recipes = this.get('recipes') || [];
    return this;
  }

  addRecipe(recipe) {
    recipe.id = this.id;
    this.id++;
    this.recipes = [...this.recipes, recipe];
    return this.saveRecipes();
  }

  deleteRecipe(recipe) {
    this.recipes = this.recipes.filter(r => r !== recipe);
    return this.saveRecipes();
  }
}

module.exports = RecipeStore;
