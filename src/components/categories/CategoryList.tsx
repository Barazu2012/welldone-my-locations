import { useTypedSelector } from '../../store'
import EntityList from '../entity-list/EntityList'

const CategoryList = () => {
  const categories = useTypedSelector(state => state.categories.all)
  
  return (
    <EntityList items={categories} type="category"/>
  )
}

export default CategoryList
