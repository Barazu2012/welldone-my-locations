import './coordinates-selector.scss'
import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import { AimOutlined as LocationIcon } from '@ant-design/icons';
import { FormInstance } from 'antd';

interface Props {
  onChange?(coordinates: [number, number]): void
  initialCoordinates?: [number, number]
  formData?: {form: FormInstance<any>, itemName: string}
}
export const CoordinatesSelector = ({initialCoordinates, onChange, formData}: Readonly<Props>) => {
  
  const [viewport, setViewport] = useState({
    width: "auto",
    height: "auto",
    latitude: initialCoordinates?.[0] || 32.0853,
    longitude: initialCoordinates?.[1] || 34.7818,
    zoom: 9
  });

  const handleChange = (v: typeof viewport) => {
    setViewport(v)

    const coordinates: [number, number] = [v.latitude, v.longitude]
    onChange?.(coordinates)
    if (formData) {
      formData.form.setFieldsValue({[formData.itemName]: coordinates})
    }
  }

  return (
    <div className="coordinates-selector">
      <div className="coordinates-text-container">
        <span className="coordinate-text">
          <span className="label">Latitude:</span>
          <span>{Number(viewport.latitude).toFixed(3)}</span>
        </span>
        <span className="coordinate-text">
          <span className="label">Longitude:</span>
          <span>{Number(viewport.longitude).toFixed(3)}</span>
        </span>
      </div>
      <div className="map-wrapper">
        <Map className="map" mapStyle="mapbox://styles/mapbox/bright-v9" 
          onViewportChange={(v: typeof viewport) => handleChange(v)}
          {...viewport} style={{flex: 1}}>
            <Marker latitude={viewport.latitude} longitude={viewport.longitude} >
              <LocationIcon className="marker-icon"/>
            </Marker>
          </Map>
      </div>
    </div>
  )
}
