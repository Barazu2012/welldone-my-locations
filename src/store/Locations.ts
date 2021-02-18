import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Category from '../models/Category';
import Location from '../models/Location'

// todo: local storage

interface LocationsState {
  all: Location[],
  selected?: Location
}

const testCats: Category[] = []
for (let i = 0; i < 20; i++) {
  testCats.push({name: `test ${i}`})
}

const testLocs: Location[] = []
for (let i = 0; i < 20; i++) {
  testLocs.push({
    name: `test location ${i}`,
    address: `test address ${i}`,
    category: testCats[i],
    coordinates: [i + 1, i + 1]
  })
}
const initialState: LocationsState = {all: testLocs}

// const initialState: LocationsState = {all: []}
const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state, {payload: location}: PayloadAction<Location>) => {
      state.all.push(location)
    },
    selectLocation: (state, {payload: locationName}: PayloadAction<string | undefined>) => {
      const location = state.all.find(l => l.name === locationName)
      state.selected = location
    },
    editLocation: (state, {payload}: PayloadAction<[Location, string]>) => {
      const [updatedLocation, oldLocationName] = payload
      const oldLocationIdx = state.all.findIndex(ol => ol.name === oldLocationName)
      state.all.splice(oldLocationIdx, 1, updatedLocation)
    }
  }
})

export const { addLocation, selectLocation, editLocation } = locationsSlice.actions
export default locationsSlice