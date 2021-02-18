import './upsert-category.scss'
import { Form, Input, Button, message } from 'antd'
import { useTypedSelector } from '../../store'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useDispatch } from 'react-redux'
import { addCategory, editCategory } from '../../store/Categories'

export const UpsertCategory = () => {

  const categories = useTypedSelector(state => state.categories.all)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()


  const initialCategoryName = queryString.parse(location.search).entityName
  const initialCategory = categories.find(c => c.name === initialCategoryName)
  const title = initialCategory ? 'Edit Category' : 'Create New Category'

  const goToCategoriesList = () => history.push('/')

  const handleSubmit = ({categoryInput: newName}: {[name: string]: string}) => {
    if (initialCategory) {
      if (newName !== initialCategory.name) {
        dispatch(editCategory([initialCategory.name, newName]))
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
        const nameTaken = !!categories.find(c => c.name === newName) && initialCategory?.name !== newName
        const message = 'A category with this name already exists'
        return nameTaken ? Promise.reject(message) : Promise.resolve() 
      }
    }
  ]

  return (
    <div className="upsert-category upsert-entity">
      <h1 className="title">{title}</h1>
      <Form onFinish={handleSubmit}>
        <Form.Item name="categoryInput" rules={inputRules} initialValue={initialCategoryName}>
          <Input placeholder="Enter the category name" onPressEnter={e => handleSubmit} autoFocus/>
        </Form.Item>
        <Form.Item>
          <Button type="ghost" onClick={goToCategoriesList}> Cancel </Button>
          <Button type="primary" htmlType="submit"> { initialCategory ? 'Save' : 'Create' } </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpsertCategory
