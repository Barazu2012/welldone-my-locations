import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Category from '../models/Category';

interface CategoriesState {
  all: Category[],
  selected?: Category
}

const loadState = (): CategoriesState | undefined => {
  try {
    const serializedState = localStorage.getItem('category-state');
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (err) {
    console.error('Failed to load local storage', err)
  }
}; 

export const saveCategoriesState = ({all}: CategoriesState) => {
  try {
    const serializedState = JSON.stringify({all});
    localStorage.setItem('category-state', serializedState);
  } catch(err) {
    console.error('Failed to save to local storage', err) 
  }
};

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