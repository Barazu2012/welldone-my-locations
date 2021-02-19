import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocalStorageService from '../services/LocalStorageService';
import Category from '../models/Category';

interface CategoriesState {
  all: Category[],
  selected?: Category
}

const localStorageService = new LocalStorageService<CategoriesState>()

const loadState = () => localStorageService.loadState('category-state')

export const saveCategoriesState = ({all}: CategoriesState) => 
  localStorageService.saveState({all}, 'category-state')
  
// Todo: remove
// const testCats: Category[] = []
// for (let i = 0; i < 20; i++) {
//   testCats.push({name: `test ${i}`})
// }
// const initialState: CategoriesState = {all: testCats}
const initialState: CategoriesState = loadState() || { all: [] }

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, {payload: categoryName}: PayloadAction<string>) => {
      state.all.push({name: categoryName})
    },
    selectCategory: (state, {payload: categoryName}: PayloadAction<string | undefined>) => {
      const category = state.all.find(c => c.name === categoryName)
      state.selected = category
    },
    deleteCategory: (state, {payload: categoryName}: PayloadAction<string>) => {
      const idx = state.all.findIndex(c => c.name === categoryName)
      state.all.splice(idx, 1)        

      if (state.selected?.name === categoryName) {
        state.selected = undefined
      }
    },
    editCategory: (state, {payload}: PayloadAction<[string, string]>) => {
      const [categoryName, newName] = payload
      const idx = state.all.findIndex(c => c.name === categoryName)
      state.all[idx].name = newName
      
      if (state.selected?.name === categoryName) {
        state.selected.name = newName
      }
    }
  }
})

export const {addCategory, deleteCategory, selectCategory, editCategory} = categoriesSlice.actions
export default categoriesSlice