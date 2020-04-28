interface RecipeProps {
  title: String,
  category: Array<string>,
  time: String,
  id: number,
  img?: String,
}

interface Recipe {
  title: String
}

type RecipesState = {
  recipes: any,
}
