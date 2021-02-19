import './entity-list.scss'
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import Category from "../../models/Category"
import Location from '../../models/Location'
import { SmileTwoTone as SmileIcon } from '@ant-design/icons'
import EntityItem from './EntityListItem'
import React from "react"
import { selectCategory } from "../../store/Categories"
import { selectLocation } from "../../store/Locations"
import { Button } from "antd"

export type Entity = Location | Category
export type EntityType = 'category' | 'location'

interface Props {
  items: Entity[],
  type: EntityType
}

const EntityList = ({items, type}: Readonly<Props>) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const selectAction = type === 'category' ? selectCategory : selectLocation
  const pluralName = type === 'category' ? 'categories' : 'locations'
  
  const clearSelection = () => {
    dispatch(selectAction(undefined))
  }

  const goToUpsert = () => {
    history.push('/upsert')
  }

  return (
    <div className="entity-list">
      {items.length ?
        <> 
          {
            items.map(item => (
              <EntityItem item={item} key={item.name} onSelect={selectAction} type={type}/>
            )) 
          }
          <div className="free-space" onClick={clearSelection}/>
        </> :
        <div className="empty-state">
          <SmileIcon className="empty-state-icon" />
          <span className="empty-state-text"> 
            {`You don't have any ${pluralName} yet.`} 
            <br/>
            You should add some!
          </span>
          <Button type="primary" size="large" onClick={goToUpsert}> {`Create New ${type}`} </Button>
        </div>
      }
    </div>
  )
}

export default EntityList