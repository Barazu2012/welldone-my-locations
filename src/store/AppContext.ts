import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AppContext = 'locations' | 'categories'

interface ContextState {
  current: AppContext
}

const loadState = (): ContextState | undefined => {
  try {
    const serializedState = localStorage.getItem('context-state');
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (err) {
    console.error('Failed to load local storage', err)
  }
}

export const saveContextState = ({current}: ContextState) => {
  try {
    const serializedState = JSON.stringify({current});
    localStorage.setItem('context-state', serializedState);
  } catch(err) {
    console.error('Failed to save to local storage', err) 
  }
}

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