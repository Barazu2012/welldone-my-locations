import './upsert-category.scss'
import { Form, Input, Button, message } from 'antd'
import { useTypedSelector } from '../../store'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useDispatch } from 'react-redux'
import { addCategory, editCategory } from '../../store/Categories'

export const UpsertCategory = () => {

  const selectedCategory = useTypedSelector(state => state.categories.selected)
  const categories = useTypedSelector(state => state.categories.all)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const title = selectedCategory ? 'Edit Category' : 'Create New Category'
  const initialInputValue = queryString.parse(location.search).categoryName || undefined

  const goToCategoriesList = () => history.push('/')

  const handleSubmit = ({categoryInput: newName}: {[name: string]: string}) => {
    if (selectedCategory) {
      if (newName !== selectedCategory.name) {
        dispatch(editCategory([selectedCategory.name, newName]))
        message.success('Edited category successfully!')
      }
    } else {
      dispatch(addCategory(newName))
      message.success('Created new category successfully!')
    }

    goToCategoriesList()
  }

  const inputRules = [
    {required: true, message: 'Please enter a category'},
    {
      validator: (rule: any, newName: string) => { 
        const nameTaken = !!categories.find(c => c.name === newName) && selectedCategory?.name !== newName
        const message = 'A category with this name already exists'
        return nameTaken ? Promise.reject(message) : Promise.resolve() 
      }
    }
  ]

  return (
    <div className="upsert-category">
      <h1 className="title">{title}</h1>
      <Form onFinish={handleSubmit}>
        <Form.Item name="categoryInput" rules={inputRules} initialValue={initialInputValue}>
          <Input placeholder="Enter the category name" onPressEnter={e => handleSubmit} autoFocus/>
        </Form.Item>
        <Form.Item>
          <Button type="ghost" onClick={goToCategoriesList}> Cancel </Button>
          <Button type="primary" htmlType="submit"> { selectedCategory ? 'Save' : 'Create' } </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpsertCategory
