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

interface FormData {
  name: string, address: string, coordinatesX: number, coordinatesY: number, category: string
}

export const UpsertLocation = () => {

  const locations = useTypedSelector(state => state.locations.all)
  const categories = useTypedSelector(state => state.categories.all)
  const dispatch = useDispatch()
  const history = useHistory()
  const [form] = Form.useForm()
  const routerLocation = useLocation()
  const initialLocationName = queryString.parse(routerLocation.search).entityName
  const initialLocation = locations.find(l => l.name === initialLocationName)

  const title = initialLocation ? 'Edit Location' : 'Create New Location'

  const goToLocationsList = () => history.push('/')

  const handleSubmit = ({name, address, category, coordinatesX, coordinatesY}: FormData) => {
    const location: Location = {
      name,
      address,
      category: {name: category},
      coordinates: [coordinatesX, coordinatesY]
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

    goToLocationsList()
  }

  const inputRules = [
    {required: true, message: 'Please enter a location'},
    {
      validator: (rule: any, newName: string) => { 
        const nameTaken = !!locations.find(c => c.name === newName) && initialLocation?.name !== newName
        const message = 'A location with this name already exists'
        return nameTaken ? Promise.reject(message) : Promise.resolve() 
      }
    }
  ]

  return (
    <div className="upsert-location upsert-entity">
      <h1 className="title">{title}</h1>
      <Form onFinish={handleSubmit} form={form}>
        <Form.Item name="name" rules={inputRules} initialValue={initialLocationName}>
          <Input placeholder="Enter the location name" autoFocus/>
        </Form.Item>
        <Form.Item name="category" initialValue={initialLocation?.category.name}>
          <CategorySelect categories={categories} form={form} formItemName="category"/>
        </Form.Item>
        <Form.Item name="address" initialValue={initialLocation?.address}>
          <Input placeholder="Enter the location address"/>
        </Form.Item>
        <div className="coordinates-container">
          <Form.Item name="coordinatesX" initialValue={initialLocation?.coordinates[0]}>
            <Input placeholder="Coordinates: x (e.g. 75.3234)" type="number"/>
          </Form.Item>
          <Form.Item name="coordinatesY" initialValue={initialLocation?.coordinates[1]}>
            <Input placeholder="Coordinates: y (e.g. 25.1244)" type="number"/>
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="ghost" onClick={goToLocationsList}> Cancel </Button>
          <Button type="primary" htmlType="submit"> { initialLocation ? 'Save' : 'Create' } </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpsertLocation
