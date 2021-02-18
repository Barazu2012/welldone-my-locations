import React from 'react'
import { useTypedSelector } from '../../store'
import EntityList from '../entity-list/EntityList'

const LocationList = () => {
  const locations = useTypedSelector(state => state.locations.all)
  
  return (
    <EntityList items={locations} type="location"/>
  )
}

export default LocationList