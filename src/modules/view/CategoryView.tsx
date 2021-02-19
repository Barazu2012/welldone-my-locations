import './category-view.scss'
import { useHistory, useLocation } from "react-router-dom"
import { SmileTwoTone as SmileIcon } from '@ant-design/icons'
import queryString from 'query-string'
import { useTypedSelector } from '../../store'
import EntityViewProperty from '../../components/entity-view/EntityViewProperty'
import { useDispatch } from 'react-redux'
import { setContext } from '../../store/AppContext'
import { selectLocation } from '../../store/Locations'
import React from 'react'
import { Button } from 'antd'

const CategoryView = () => {
  const routerLocation = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const categoryName = queryString.parse(routerLocation.search).entityName as string
  const locations = useTypedSelector(state => state.locations.all)
  const categoryLocations = locations.filter(l => l.category.name === categoryName)

  const goToViewLocation = (locationName: string) => {
    const search = queryString.stringify({entityName: locationName})
    dispatch(setContext('locations'))
    dispatch(selectLocation(locationName))
    history.push({pathname: 'view', search})
  }

  const goToCreateLocation = () => {
    dispatch(setContext('locations'))
    history.push({pathname: '/upsert'})
  }
  
  return (
    <div className="category-view">
      <h1 className="title"> Category Details </h1>
      { categoryLocations.length ? 
        <div className="content">
          <EntityViewProperty label="name:" values={categoryName}/>
          <EntityViewProperty label="locations count:" values={categoryLocations.length}/>
          <EntityViewProperty className="locations-property" label="locations:" 
            values={categoryLocations.map(l => l.name)} onValueClick={goToViewLocation}
          />
        </div> :
        <div className="empty-state">
          <SmileIcon className="category-view-icon"/>
          <span className="empty-state-text">
            Nothing to see here. Yet. 
          </span>
          <span className="empty-state-text">
            Why not create some new locations? 
          </span> 
          <Button type="primary" size="large" onClick={goToCreateLocation}>
            Create New Location 
          </Button>
        </div>
      }
      <div className="back-button-wrapper">
        <Button className="back-button" onClick={() => history.push('/')} size="large">
          Back to category list
        </Button>
      </div>
    </div>
  )
}

export default CategoryView
