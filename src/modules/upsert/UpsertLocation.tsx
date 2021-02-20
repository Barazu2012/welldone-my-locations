import './upsert-location.scss'
import { Form, Input, Button, message } from 'antd'
import { useTypedSelector } from '../../store'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useDispatch } from 'react-redux'
import { addLocation, editLocation } from '../../store/Locations'
import Location from '../../models/Location'
import React from 'react'
import isEqual from 'lodash/isEqual'
import CategorySelect from '../../components/categories/CategorySelect'
import getNameInputRule from './getNameInputRule'
import { CoordinatesSelector } from '../../components/map/CoordinatesSelector'

interface FormData {
  name: string, address: string, coordinatesX: string, categoryNames: string[], coordinates: [number, number]
}

export const UpsertLocation = () => {
  const locations = useTypedSelector(state => state.locations.all)
  const dispatch = useDispatch()
  const history = useHistory()
  const categories = useTypedSelector(state => state.categories.all)
  const [form] = Form.useForm()
  const routerLocation = useLocation()

  const initialLocationName = queryString.parse(routerLocation.search).entityName
  const initialLocation = locations.find(l => l.name === initialLocationName)
  const title = initialLocation ? 'Edit Location' : 'Create New Location'

  const goToLocationList = () => history.push('/')

  const handleSubmit = (test: FormData) => {
    const {name, address, categoryNames, coordinates} = test
    const location: Location = {
      name,
      address,
      categories: categoryNames.map(cn => ({name: cn})),
      coordinates
    }

    if (initialLocation) {
      if (!isEqual(initialLocation, location)) {
        dispatch(editLocation([location, initialLocation.name]))
        message.success('Edited location successfully!')
      }
    } else {
      dispatch(addLocation(location))
      message.success('Created new location successfully!')
    }

    goToLocationList()
  }

  const inputRules = getNameInputRule(locations, initialLocation?.name, 'location')
  const getRequiredRule: any = (fieldName: string, arr?: boolean) => (
    {required: true, message: `Please enter a ${fieldName}`, type: arr ? 'array' : 'string'}
  )
  const categoriesInitialValue = initialLocation ? initialLocation.categories.map(c => c.name) : undefined
  

  return (
    <div className="upsert-location upsert-entity">
      <h1 className="title">{title}</h1>
      <Form onFinish={handleSubmit} form={form} className="upsert-location-form">
        <Form.Item name="name" rules={inputRules} initialValue={initialLocationName}>
          <Input placeholder="Enter the location name" autoFocus/>
        </Form.Item>
        <Form.Item name="categoryNames" initialValue={categoriesInitialValue}
          rules={[getRequiredRule('category', true)]}
        >
          <CategorySelect categories={categories} formData={{form, itemName: 'categoryNames'}} multiple/>
        </Form.Item>
        <Form.Item name="address" initialValue={initialLocation?.address} 
          rules={[getRequiredRule('location address')]}
        >
          <Input placeholder="Enter the location address"/>
        </Form.Item>
        <Form.Item name="coordinates" className="coordinates-selector-wrapper">
          <CoordinatesSelector initialCoordinates={initialLocation?.coordinates} 
            formData={{form, itemName: 'coordinates'}} 
          />
        </Form.Item>
        <Form.Item>
          <Button type="ghost" onClick={goToLocationList}> Cancel </Button>
          <Button type="primary" htmlType="submit"> { initialLocation ? 'Save' : 'Create' } </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpsertLocation
