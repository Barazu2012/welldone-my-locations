import './upsert-entity.scss'
import React from 'react'
import { useTypedSelector } from '../../store'
import UpsertCategory from '../category/UpsertCategory'
import UpsertLocation from '../location/UpsertLocation'


const UpsertEntity = () => {
  const currentContext = useTypedSelector(state => state.context.current)

  return currentContext === 'categories' ? <UpsertCategory /> : <UpsertLocation />
}

export default UpsertEntity