import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import Categories, { saveCategoriesState } from './Categories'
import AppContext, { saveContextState } from './AppContext'
import Locations from './Locations'

const reducer = {
  context: AppContext.reducer,
  categories: Categories.reducer,
  locations: Locations.reducer
}

const store = configureStore({reducer})

store.subscribe(() => {
  const state = store.getState()
  saveCategoriesState(state.categories)
  saveContextState(state.context)
})

export type RootState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
