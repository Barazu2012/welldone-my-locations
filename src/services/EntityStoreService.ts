import { CategoriesState } from "../store/Categories";
import { LocationsState } from "../store/Locations";

export default class EntityStoreService<S extends  CategoriesState | LocationsState> {
  selectCategory (state: S, entityName: string | undefined) {
    const category = state.all.find(c => c.name === entityName)
    state.selected = category
  }
  deleteCategory (state: S, entityName: string) {
    const idx = state.all.findIndex(c => c.name === entityName)
    state.all.splice(idx, 1)        

    if (state.selected?.name === entityName) {
      state.selected = undefined
    }
  }
}