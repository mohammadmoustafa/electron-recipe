import PouchDB from 'pouchdb';

class RecipeStore {

    db: any;
    constructor() {
      this.db = new PouchDB('recipes');
    }

    getDB() {
      return this.db
    }

    addRecipe(recipe: any) {
      return this.db.put(recipe);
    }

    updateRecipe(id: string, recipe: any) {
      this.db.get(id).then((res: any) => {
        recipe._rev = res._rev;
        this.db.put(recipe);
      }).catch((err: any) => {
        console.log(err);
      });
    }

    getRecipe(id: string) {
      return this.db.get(id, { include_docs: true, attachments: true, binary: true });
    }

    getRecipes() {
      return this.db.allDocs({ include_docs: true, attachments: true, binary: true });
    }
    
    deleteRecipe(id: string) {
      this.db.remove(id).then((res: any) => {
        console.log(`[id=${id}] Recipe has been deleted.`)
      }).catch((err: any) => {
        console.log(err);
      });
    }
}

export default RecipeStore;