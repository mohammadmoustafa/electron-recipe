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
  img: {
    type: 'string',
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
    this.id = this.get('id') || 0;
    console.log(this.get('id'));
  }

  saveRecipes() {
    this.set('recipes', this.recipes);
    this.set('id', this.id);
    return this;
  }

  getRecipes() {
    this.recipes = this.get('recipes') || [];
    this.id = this.get('id') || 0;
    return this;
  }

  addRecipe(recipe) {
    recipe.id = this.id;
    ++this.id;
    this.recipes = [...this.recipes, recipe];
    return this.saveRecipes();
  }

  deleteRecipe(recipe) {
    this.recipes = this.recipes.filter(r => r !== recipe);
    return this.saveRecipes();
  }
}

module.exports = RecipeStore;
