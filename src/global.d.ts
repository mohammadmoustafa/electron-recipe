interface RecipeProps {
  title: String,
  category: Array<String>,
  time: String,
  img?: String,
}

interface Recipe {
  title: String
}

type RecipesState = {
  recipes: any,
}
