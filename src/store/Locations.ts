import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocalStorageService from '../services/LocalStorageService';
import Location from '../models/Location'
import EntityStoreService from '../services/EntityStoreService';

export interface LocationsState {
  all: Location[],
  selected?: Location
}

const localStorageService = new LocalStorageService<LocationsState>()
const entityStoreService = new EntityStoreService<LocationsState>()

const loadState = () => localStorageService.loadState('location-state')

export const saveLocationState = ({all}: LocationsState) => 
  localStorageService.saveState({all}, 'location-state')

const initialState: LocationsState = loadState() || { all: [] }
const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state, {payload: location}: PayloadAction<Location>) => {
      state.all.push(location)
    },
    selectLocation: (state, {payload: locationName}: PayloadAction<string | undefined>) =>  {
      entityStoreService.selectCategory(state, locationName)
    },
    deleteLocation: (state, {payload: locationName}: PayloadAction<string>) => {
      entityStoreService.deleteCategory(state, locationName)
    },
    editLocation: (state, {payload}: PayloadAction<[Location, string]>) => {
      const [updatedLocation, oldLocationName] = payload
      const oldLocationIdx = state.all.findIndex(ol => ol.name === oldLocationName)
      state.all.splice(oldLocationIdx, 1, updatedLocation)

      if (state.selected?.name === oldLocationName) {
        state.selected = updatedLocation
      }
    }
  }
})

export const { addLocation, selectLocation, editLocation, deleteLocation } = locationsSlice.actions
export default locationsSlice