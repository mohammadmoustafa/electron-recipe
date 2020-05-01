const Store = require('electron-store');

const recipeSchema = {
  id: {
    type: 'integer',
    default: 0
  },
  recipes: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          default: -1
        },
        title: {
          type: 'string',
          minLength: 1,
          maxLength: 30
        },
        img: {
          type: 'string',
        },
        categories: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        prepTime: {
          type: 'integer',
          minimum: 0
        },
        cookTime: {
          type: 'integer',
          minimum: 0
        },
        ingredients: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              quantity: { type: 'number', minimum: 1 },
              unit: { type: 'string' }
            }
          }
        },
        directions: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        notes: {
          type: 'string'
        }
      }
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

  getRecipe(id) {
    this.getRecipes();
    return this.recipes.filter(recipe => recipe.id == id);
  }

  addRecipe(recipe) {
    console.log(recipe);
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
