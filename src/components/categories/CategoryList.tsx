import './category-list.scss'
import { useTypedSelector } from '../../store'
import CategoryItem from './CategoryListItem'
import { useDispatch } from 'react-redux'
import { selectCategory } from '../../store/Categories'
import { SmileTwoTone as SmileIcon } from '@ant-design/icons'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const CategoryList = () => {
  const categories = useTypedSelector(state => state.categories.all)
  const dispatch = useDispatch()
  const history = useHistory()
  
  const clearSelection = () => {
    dispatch(selectCategory(undefined))
  }

  const goToUpsert = () => {
    history.push('/upsert')
  }

  return (
    <div className="category-list">
      {categories.length ?
        <> 
          {
            categories.map(category => (
              <CategoryItem category={category} key={category.name}/>
            )) 
          }
          <div className="free-space" onClick={clearSelection}/>
        </> :
        <div className="empty-state">
          <SmileIcon className="empty-state-icon" />
          <span className="empty-state-text"> 
            You don't have any categories yet. 
            <br/>
            You should add some!
          </span>
          <Button type="primary" size="large" onClick={goToUpsert}> Create New Category </Button>
        </div>
      }
    </div>
  )
}

export default CategoryList
