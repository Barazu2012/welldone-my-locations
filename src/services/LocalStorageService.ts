export type LocalStorageItem = 'category-state' | 'context-state' | 'location-state'

export default class LocalStorageService<S> {
  loadState(item: LocalStorageItem): S | undefined {
    try {
      const serializedState = localStorage.getItem(item);
      return serializedState ? JSON.parse(serializedState) : undefined
    } catch (err) {
      console.error('Failed to load local storage', err)
    }
  }

  saveState = (state: S, item: LocalStorageItem) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(item, serializedState);
    } catch(err) {
      console.error('Failed to save to local storage', err) 
    }
  }
}