import './location-view.scss'
import { useHistory } from 'react-router-dom'
import { useTypedSelector } from '../../store'
import {StaticMap as Map} from 'react-map-gl';
import { Button } from 'antd';
import EntityViewProperty from '../../components/entity-view/EntityViewProperty';
import React from 'react';
import { Marker } from 'react-map-gl';
import { AimOutlined as LocationIcon } from '@ant-design/icons';

const LocationView = () => {
  const history = useHistory()
  const selectedLocation = useTypedSelector(state => state.locations.selected)

  const viewport = {
    height: "auto",
    width: "auto",
    latitude: selectedLocation?.coordinates[0],
    longitude: selectedLocation?.coordinates[1],
    zoom: 15
  }

  return (
    <div className="location-view">
      {selectedLocation &&
        <div className="content">
          <div className="properties-container">
            <EntityViewProperty label="Name:" values={selectedLocation.name}/>
            <EntityViewProperty label="Address:" values={selectedLocation.address}/>
            <EntityViewProperty label="Category:" values={selectedLocation.category.name}/>
            <EntityViewProperty label="Latitude:" values={selectedLocation.coordinates[0]}/>
            <EntityViewProperty label="Longitude:" values={selectedLocation.coordinates[1]}/>

            <Button onClick={() => history.push('/')}>
              Back to location list 
            </Button>
          </div>

          <div className="map-wrapper">
            <Map className="map" mapStyle="mapbox://styles/mapbox/bright-v9" 
              {...viewport} style={{flex: 1}}>
                <Marker latitude={selectedLocation.coordinates[0]} longitude={selectedLocation.coordinates[1]} >
                  <LocationIcon className="marker-icon"/>
                </Marker>
            </Map>
          </div>
        </div>
      }
    </div>
  )
}

export default LocationView
