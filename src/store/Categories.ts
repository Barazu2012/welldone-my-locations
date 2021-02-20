import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocalStorageService from '../services/LocalStorageService';
import Category from '../models/Category';
import EntityStoreService from '../services/EntityStoreService';

export interface CategoriesState {
  all: Category[],
  selected?: Category
}

const localStorageService = new LocalStorageService<CategoriesState>()
const entityStoreService = new EntityStoreService<CategoriesState>()

const loadState = () => localStorageService.loadState('category-state')

export const saveCategoriesState = ({all}: CategoriesState) => 
  localStorageService.saveState({all}, 'category-state')
  
const initialState: CategoriesState = loadState() || { all: [] }

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, {payload: categoryName}: PayloadAction<string>) => {
      state.all.push({name: categoryName})
    },
    selectCategory: (state, {payload: categoryName}: PayloadAction<string | undefined>) =>  {
      entityStoreService.selectCategory(state, categoryName)
    },
    deleteCategory: (state, {payload: categoryName}: PayloadAction<string>) => {
      entityStoreService.deleteCategory(state, categoryName)
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