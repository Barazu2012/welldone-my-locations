import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import Categories, { saveCategoriesState } from './Categories'

const reducer = {
  categories: Categories.reducer
}

const store = configureStore({reducer})

store.subscribe(() => {
  saveCategoriesState(store.getState().categories)
})

export type RootState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
