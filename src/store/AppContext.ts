import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import LocalStorageService from "../services/LocalStorageService";

export type AppContext = 'locations' | 'categories'

interface ContextState {
  current: AppContext
}

const localStorageService = new LocalStorageService<ContextState>()

const loadState = () => localStorageService.loadState('context-state')

export const saveContextState = ({current}: ContextState) => 
  localStorageService.saveState({current}, 'context-state')


const initialState: ContextState = loadState() || { current: 'categories' }
const contextSlice = createSlice({
  name: 'conext',
  initialState,
  reducers: {
    setContext: (state, {payload: context}: PayloadAction<AppContext>) => {
      state.current = context
    }
  }
})

export const { setContext } = contextSlice.actions
export default contextSlice