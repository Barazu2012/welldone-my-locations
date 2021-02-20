import './location-view.scss'
import { useHistory } from 'react-router-dom'
import { useTypedSelector } from '../../store'
import Map from 'react-map-gl';
import { Button } from 'antd';
import EntityViewProperty from '../../components/entity-view/EntityViewProperty';
import React, { useState } from 'react';
import { Marker } from 'react-map-gl';
import { AimOutlined as LocationIcon } from '@ant-design/icons';

const LocationView = () => {
  const history = useHistory()
  const selectedLocation = useTypedSelector(state => state.locations.selected)

  const [viewport, setViewport] = useState({
    height: "auto",
    width: "auto",
    latitude: selectedLocation?.coordinates[0],
    longitude: selectedLocation?.coordinates[1],
    zoom: 13.5
  })

  return (
    <div className="location-view">
      {selectedLocation &&
        <div className="content">
          <div className="properties-container">
            <EntityViewProperty label="Name:" values={selectedLocation.name}/>
            <EntityViewProperty label="Address:" values={selectedLocation.address}/>
            <EntityViewProperty label="Categories:" multiple 
              values={selectedLocation.categories.map(c => c.name)}
            />
            <EntityViewProperty label="Latitude:" values={Number(selectedLocation.coordinates[0]).toFixed(3)}/>
            <EntityViewProperty label="Longitude:" values={Number(selectedLocation.coordinates[0]).toFixed(3)}/>

            <Button onClick={() => history.push('/')}>
              Back to location list 
            </Button>
          </div>

          <div className="map-wrapper">
            <Map className="map" mapStyle="mapbox://styles/mapbox/bright-v9" 
              {...viewport} style={{flex: 1}} onViewportChange={(v: typeof viewport) => setViewport(v)}>
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
