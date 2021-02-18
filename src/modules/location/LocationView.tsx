import './location-view.scss'
import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'
import { useTypedSelector } from '../../store'
import {StaticMap as Map} from 'react-map-gl';
import { Button } from 'antd';
import EntityViewProperty from '../../components/entity-view/EntityViewProperty';

const LocationView = () => {

  const routerLocation = useLocation()
  const history = useHistory()
  const locations = useTypedSelector(state => state.locations.all)
  const initialLocationName = queryString.parse(routerLocation.search).entityName
  const initialLocation = locations.find(l => l.name === initialLocationName)

  const viewport = {
    height: "auto",
    width: "auto",
    latitude: initialLocation?.coordinates[0],
    longitude: initialLocation?.coordinates[1],
    zoom: 8
  }

  const goToLocationList = () => { history.push('/') }

  return (
    <div className="location-view">
      {initialLocation &&
        <div className="content">
          <div className="properties-container">
            <EntityViewProperty label="Name:" values={initialLocation.name}/>
            <EntityViewProperty label="Address:" values={initialLocation.address}/>
            <EntityViewProperty label="Category:" values={initialLocation.category.name}/>
            <EntityViewProperty label="Latitude:" values={initialLocation.coordinates[0]}/>
            <EntityViewProperty label="Longitude:" values={initialLocation.coordinates[1]}/>

            <Button onClick={goToLocationList}> Back to location list </Button>
          </div>

          <div className="map-wrapper">
            <Map className="map" mapStyle="mapbox://styles/mapbox/bright-v9" 
              {...viewport} style={{flex: 1}} />
          </div>
        </div>
      }
    </div>
  )
}

export default LocationView
